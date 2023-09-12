"use client";

import Button from "@/components/Button";
import { ArrowRight, Close, TimesCircle } from "@/components/icons";
import {
  getFormData,
  getLoggedInVendor,
  updateVendor,
} from "@/lib/api/vendor.api";
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { citiesUAE, countries, vendorCategories } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import useSWR from "swr";

const animatedComponents = makeAnimated();

const Page = () => {
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<string[]>([]);
  const [sinput, setSInput] = useState("");

  const { isLoading, data: formData } = useSWR(
    "/api/vendors/checkout/form-data",
    getFormData
  );

  const [files, setFiles] = useState({
    image_1: null,
    image_2: null,
    image_3: null,
  });

  const formik = useFormik({
    initialValues: {
      company_name: "",
      company_overview: "",
      company_email: "",
      company_location: "",
      country: "",
      city: "",
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
      license_number: "",
      coverage_cities: [],
      whatsapp_number: "",
      office_number: "",
      website: "",
      instagram: "",
      vendor_category: "",
    },
    onSubmit: async (data) => {
      const userData: any = { ...data };
      userData.coverage_cities = JSON.stringify(data.coverage_cities);

      userData.vendorCategoryId = data.category.value;
      userData.vendorSubCategoryId = data.subCategory.value;

      userData.services = userData.services.map(
        (service: any) => service.label
      );

      userData.services = JSON.stringify(userData.services);

      delete userData.category;
      delete userData.subCategory;

      let formData = new FormData();

      for (var key in userData) {
        formData.append(key, userData[key]);
      }

      setLoading(true);
      try {
        const res = await updateVendor(formData, vendor.id);
        NotificationManager.success("Updated Successfully");
        // const id = res.data.record.id;
        // if (typeof window !== "undefined") localStorage.removeItem("vSub");
      } catch (error: any) {
        if (error?.response?.status == 400) {
          NotificationManager.error(
            "Error message",
            error?.response?.data?.msg
          );
        } else {
          NotificationManager.error("Error message", "Something went wrong");
        }
      } finally {
        setLoading(false);
      }

      setLoading(false);
    },
    validationSchema: Yup.object().shape({
      company_name: Yup.string().required("Company Name Required"),
      company_overview: Yup.string().required("Company Brief Required"),
    }),
  });

  const handleChange = (e: any) => {
    const file = e.target.files[0];

    setFiles((prev) => {
      return { ...prev, [e.target.name]: file };
    });
  };

  const handleRemove = (field: string) => {
    setFiles((prev) => {
      return { ...prev, [field]: null };
    });
  };

  useEffect(() => {
    getLoginVendor();
  }, []);

  const getLoginVendor = async () => {
    try {
      setLoading(true);
      const res = await getLoggedInVendor();
      let vendor = { ...res.vendor };
      vendor.coverage_cities = JSON.parse(vendor.coverage_cities);
      setServices(vendor.services);

      const initKeys = Object.keys(formik.initialValues);
      for (let i = 0; i < initKeys.length; i++) {
        const item = initKeys[i];
        if (item in vendor) {
          formik.setFieldValue(item, vendor[item]);
        }
      }
      formik.setFieldValue("category", {
        value: vendor.VendorCategory.id,
        label: vendor.VendorCategory.title,
        services: vendor.VendorCategory.services,
      });

      if (vendor.vendorSubCategoryId) {
        formik.setFieldValue("subCategory", {
          value: vendor.VendorSubCategory.id,
          label: vendor.VendorSubCategory.title,
          services: vendor.VendorSubCategory.services,
        });
      }

      if (vendor.services) {
        const services = vendor.services.map((service: string) => {
          return {
            value: service,
            label: service,
          };
        });
        formik.setFieldValue("services", services);
      }
      setVendor(vendor);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const addServices = () => {
    if (sinput.length < 1) return;
    setServices((prev: string[]) => {
      return [...prev, sinput];
    });
    setSInput("");
  };

  const removeService = (i: number) => {
    setServices((prev) => prev.filter((s, idx) => idx !== i));
  };

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
    <div>
      My Profile Page
      {/* <Image src={vendor?.image_1_path} alt="Image" height={200} width={200} /> */}
      <form onSubmit={formik.handleSubmit} className="comment__form">
        <div className="field">
          <input
            onChange={formik.handleChange}
            value={formik.values.company_name}
            placeholder="Company name*"
            name="company_name"
            type="text"
          />
          {formik.touched && formik.errors.company_name && (
            <span className="error">{formik.errors.company_name}</span>
          )}
        </div>

        <div className="field_wrapper">
          <span className="hint">
            Kindly write a detailed brief bio as it will be displayed in your
            profile
          </span>
          <div className="field textarea h-[100px]">
            <textarea
              onChange={formik.handleChange}
              value={formik.values.company_overview}
              name="company_overview"
              placeholder="Company Brief"
              rows={3}
            ></textarea>
            {formik.touched && formik.errors.company_overview && (
              <span className="error">{formik.errors.company_overview}</span>
            )}
          </div>
        </div>
        <div className="field_wrapper">
          <span className="hint">
            This email will be used for communication and leads sent to it and
            clients will use to communicate it
          </span>
          <div className="field">
            <input
              onChange={formik.handleChange}
              value={formik.values.company_email}
              placeholder="Company Email Address*"
              type="email"
              name="company_email"
            />
            {formik.touched && formik.errors.company_email && (
              <span className="error">{formik.errors.company_email}</span>
            )}
          </div>
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
                value={formik.values.subCategory}
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
              value={formik.values.services}
              isMulti
              placeholder="Select Services"
              options={getServices(
                formik.values.category.services,
                formik.values.subCategory.services
              )}
            />
          </div>
        )}

        <div className="field">
          <input
            onChange={formik.handleChange}
            value={formik.values.company_location}
            name="company_location"
            placeholder="Company Location"
            type="text"
          />
        </div>

        <div className="field">
          <select
            onChange={formik.handleChange}
            value={formik.values.country}
            name="country"
          >
            <option value="">Select country</option>

            {countries.map((country, i) => (
              <option key={i} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {formik.touched && formik.errors.country && (
            <span className="error">{formik.errors.country}</span>
          )}
        </div>

        <div className="field">
          <input
            onChange={formik.handleChange}
            value={formik.values.city}
            name="city"
            placeholder="City"
            type="text"
          />
        </div>
        <div className="field_wrapper">
          <span className="hint">
            Kindly include the cities you service cover in uae
          </span>
          <div className="field multiple">
            <select
              onChange={formik.handleChange}
              value={formik.values.coverage_cities}
              name="coverage_cities"
              multiple
            >
              <option value="">Select Coverage country</option>

              {citiesUAE.map((city, i) => (
                <option key={i} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            {formik.touched && formik.errors.coverage_cities && (
              <span className="error">{formik.errors.coverage_cities}</span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap max-w-full">
          {formik.values.coverage_cities.map((city, i) => (
            <div
              key={i + "coverage"}
              className="px-2 py-1 text-xs whitespace-nowrap bg-gray-200 rounded-lg inline-block mx-1 my-1"
            >
              {city}
            </div>
          ))}
        </div>
        <div className="field_wrapper">
          <span className="hint">Kindly include services you provide</span>
          <div>
            <div className="flex gap-3">
              <input
                type="text"
                onChange={(e) => setSInput(e.target.value)}
                value={sinput}
                className="border-gray-300 px-4 py-2 add_input"
              />
              <button
                disabled={!sinput.length}
                className="add_button"
                type="button"
                onClick={() => addServices()}
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex flex-wrap max-w-full my-2 mt-4">
            {services.map((service, i) => (
              <div
                key={i + "services"}
                className="px-2 items-center py-2 text-sm flex whitespace-nowrap bg-[#ffe3cd] rounded-lg mx-1 my-1"
              >
                {service}

                <div
                  className="mx-1 cursor-pointer"
                  onClick={() => removeService(i)}
                >
                  <TimesCircle />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="field">
          <input
            onChange={formik.handleChange}
            value={formik.values.license_number}
            placeholder="Company License Number *"
            name="license_number"
            type="text"
          />
          {formik.touched && formik.errors.license_number && (
            <span className="error">{formik.errors.license_number}</span>
          )}
        </div>

        <div className="field">
          <input
            onChange={formik.handleChange}
            value={formik.values.whatsapp_number}
            placeholder="WhatsApp number "
            type="text"
            name="whatsapp_number"
          />
          {formik.touched && formik.errors.whatsapp_number && (
            <span className="error">{formik.errors.whatsapp_number}</span>
          )}
        </div>

        <div className="field">
          <input
            onChange={formik.handleChange}
            value={formik.values.office_number}
            placeholder="Office number*"
            type="text"
            name="office_number"
          />
          {formik.touched && formik.errors.office_number && (
            <span className="error">{formik.errors.office_number}</span>
          )}
        </div>

        <div className="field">
          <input
            onChange={formik.handleChange}
            value={formik.values.website}
            placeholder="Website"
            type="url"
            name="website"
          />
          {formik.touched && formik.errors.website && (
            <span className="error">{formik.errors.website}</span>
          )}
        </div>

        <div className="field">
          <input
            onChange={formik.handleChange}
            value={formik.values.instagram}
            placeholder="Instagram"
            type="text"
            name="instagram"
          />
          {formik.touched && formik.errors.instagram && (
            <span className="error">{formik.errors.instagram}</span>
          )}
        </div>

        <div className="em__spacer" style={{ height: "10px" }}></div>

        <div>
          <h4>Work Images</h4>

          <div className="my-4">
            <div className="flex gap-3">
              {vendor?.VendorImage.map((img: any, i: number) => (
                <div key={i + "img"} className="bg-gray-50 rounded relative">
                  {i !== 0 && (
                    <div className="absolute top-0 right-0  z-50">
                      <Close />
                    </div>
                  )}
                  <Image height={130} width={130} src={img.url} alt="Images" />
                </div>
              ))}

              {/* <FileUploader
                handleChange={(e) => handleChange(e)}
                placeholder="Image 1"
                name="image_1"
                file={files.image_1}
                handleRemove={handleRemove}
              />

              <FileUploader
                handleChange={(e) => handleChange(e)}
                placeholder="Image 2"
                name="image_2"
                file={files.image_2}
                handleRemove={handleRemove}
              />

              <FileUploader
                handleChange={(e) => handleChange(e)}
                placeholder="Image 3"
                name="image_3"
                file={files.image_3}
                handleRemove={handleRemove}
              /> */}
            </div>
            {/* <button className="add_button" type="button">
              Add Image
            </button> */}
          </div>
        </div>

        <div className="em__spacer" style={{ height: "10px" }}></div>

        <Button
          classNames="em__button primary"
          text="Update"
          RightIcon={<ArrowRight />}
          loading={loading}
        />
      </form>
    </div>
  );
};

export default Page;
