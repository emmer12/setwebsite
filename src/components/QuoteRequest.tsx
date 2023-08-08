"use client";
import { useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { createVendorOrder, getFormData } from "@/lib/api/vendor.api";
import { categories } from "@/lib/utils";
import useSWR from "swr";
import { ArrowRight } from "./icons";
import Button from "./Button";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const animatedComponents = makeAnimated();

const RequestForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { isLoading, data: formData } = useSWR(
    "/api/vendors/checkout/form-data",
    getFormData
  );

  const formik = useFormik({
    initialValues: {
      bp_quote: false,
      people_number: "",
      event_date: "",
      occasion: "",
      location: "",
      additional_request: "",
      vendorCategoryId: "",
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
      setLoading(true);
      try {
      } catch (error: any) {
      } finally {
      }

      setLoading(false);
    },
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
      <form>
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
              isMulti
              placeholder="Select Services"
              options={getServices(
                formik.values.category.services,
                formik.values.subCategory.services
              )}
            />
          </div>
        )}

        {/* <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={options}
        />

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={options}
        /> */}
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
