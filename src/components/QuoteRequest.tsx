"use client";
import { useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useRouter } from "next/navigation";
import { createVendorOrder, getFormData } from "@/lib/api/vendor.api";
import { categories, removeEmptyValues } from "@/lib/utils";
import { NotificationManager } from "react-notifications";
import useSWR from "swr";
import { ArrowRight } from "./icons";
import Button from "./Button";
import * as Yup from "yup";
import { createRequest } from "@/lib/api/user.api";

const animatedComponents = makeAnimated();

const RequestForm = ({ redirectUrl }: { redirectUrl?: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState(null);
  const router = useRouter();

  const { isLoading, data: formData } = useSWR(
    "/api/vendors/checkout/form-data",
    getFormData
  );

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      people_number: "",
      event_date: "",
      occasion: "",
      location: "",
      additional_request: "",
      category: {
        value: "",
        label: "",
        services: [],
      },
      subCategory: {
        value: "",
        label: "",
        services: [],
      },
      services: [],
    },
    onSubmit: async (data) => {
      let userData: any = { ...data };
      userData.categoryId = data.category.value;
      userData.subCategoryId = data.subCategory.value;

      userData.services = userData.services.map(
        (service: any) => service.label
      );

      delete userData.category;
      delete userData.subCategory;

      setLoading(true);
      let formData = new FormData();

      userData = removeEmptyValues(userData);

      for (var key in userData) {
        formData.append(key, userData[key]);
      }

      if (file) {
        formData.append("doc", file);
      }

      try {
        const res = await createRequest(formData);
        NotificationManager.success("Request created!");

        router.push(redirectUrl || "/account/my-requests");
      } catch (error: any) {
        if (error?.response?.status == 400) {
          const err = error?.response?.data;
          NotificationManager.error(
            err?.msg || err?.error.errors[0].message,
            "Error message"
          );
        } else {
          NotificationManager.error("Error message", "Something went wrong");
        }
      } finally {
        router.refresh();
        setLoading(false);
      }
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("title is Required"),
      category: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
    }),
  });

  const filterCategories = formData?.categories
    ?.filter((cat: any) => cat.parent_id == null)
    .map((cat: any) => {
      return { value: cat.id, label: cat.title, services: cat.services };
    });

  const subCategories = formData?.subCategories
    ?.filter((cat: any) => cat.parent_id == formik.values.category.value)
    .map((cat: any) => {
      return { value: cat.id, label: cat.title, services: cat.services };
    });

  const getServices = (cats: string[], subCats: string[]) => {
    if (cats.length > 0) {
      return cats.map((cat) => {
        return {
          value: cat,
          label: cat,
        };
      });
    } else {
      return subCats.map((cat) => {
        return {
          value: cat,
          label: cat,
        };
      });
    }
  };

  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <input
            onChange={formik.handleChange}
            value={formik.values.title}
            placeholder="Request Title"
            type="text"
            name="title"
          />
          {formik.touched && formik.errors.title && (
            <span className="error">{formik.errors.title}</span>
          )}
        </div>

        <div className=" my-4">
          <label htmlFor="category">Select Category</label>

          <Select
            components={animatedComponents}
            options={filterCategories as any}
            onChange={(selectedOption: any) => {
              formik.setFieldValue("category", selectedOption);
            }}
            placeholder="Select Category"
            value={formik.values.category}
            name="category"
          />
        </div>

        {formik.values.category.value.length > 0 &&
          subCategories.length > 0 && (
            <div className=" my-4">
              <label htmlFor="category">Select Category</label>
              <Select
                id="category"
                components={animatedComponents}
                onChange={(selectedOption: any) => {
                  formik.setFieldValue("subCategory", selectedOption);
                }}
                placeholder="Select Sub Category"
                options={subCategories}
                name="subCategory"
              />
            </div>
          )}

        {formik.values.category.value.length > 0 && (
          <div className=" my-4">
            <label htmlFor="category">Select Services</label>

            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={(selectedOptions: any) => {
                formik.setFieldValue("services", selectedOptions);
              }}
              isMulti
              placeholder="Select Services"
              options={getServices(
                formik.values.category.services,
                formik.values.subCategory.services
              )}
            />
          </div>
        )}

        {formik.values.category.label == "Event Planners" && (
          <div>
            <div className="field">
              <input
                onChange={formik.handleChange}
                value={formik.values.people_number}
                placeholder="How many people?"
                type="number"
                name="people_number"
              />
              {formik.touched && formik.errors.people_number && (
                <span className="error">{formik.errors.people_number}</span>
              )}
            </div>

            <div className="field">
              <input
                onChange={formik.handleChange}
                value={formik.values.event_date}
                placeholder="Event date"
                type="date"
                name="event_date"
              />
              {formik.touched && formik.errors.event_date && (
                <span className="error">{formik.errors.event_date}</span>
              )}
            </div>

            <div className="field">
              <input
                onChange={formik.handleChange}
                value={formik.values.occasion}
                placeholder="Occasion"
                type="text"
                name="occasion"
              />
              {formik.touched && formik.errors.occasion && (
                <span className="error">{formik.errors.occasion}</span>
              )}
            </div>

            <div className="field">
              <input
                onChange={formik.handleChange}
                value={formik.values.location}
                placeholder="Location"
                type="text"
                name="location"
              />
              {formik.touched && formik.errors.location && (
                <span className="error">{formik.errors.location}</span>
              )}
            </div>
          </div>
        )}

        <div className="field">
          <input
            onChange={formik.handleChange}
            value={formik.values.additional_request}
            placeholder="Additional Request"
            type="text"
            name="additional_request"
          />
          {formik.touched && formik.errors.additional_request && (
            <span className="error">{formik.errors.additional_request}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="Doc">Attach Document</label>
          <input
            type="file"
            id="doc"
            placeholder="Attach Doc"
            onChange={handleChange}
          />
        </div>

        <br />

        <Button
          classNames="em__button primary"
          text="Send Request"
          RightIcon={<ArrowRight />}
          loading={loading}
        />
      </form>
    </section>
  );
};

export default RequestForm;
