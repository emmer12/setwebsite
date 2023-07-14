"use client";

import Button from "@/components/Button";
import { ArrowRight, TimesCircle } from "@/components/icons";
import { getLoggedInVendor } from "@/lib/api/vendor.api";
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { citiesUAE, countries, vendorCategories } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";

const Page = () => {
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [services, setServices] = useState<string[]>([]);
  const [sinput, setSInput] = useState("");

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
      userData.services = JSON.stringify(services);
      userData.coverage_cities = JSON.stringify(data.coverage_cities);

      let formData = new FormData();

      for (var key in userData) {
        formData.append(key, userData[key]);
      }

      if (files.image_1) {
        formData.append("image_1", files.image_1);
      }
      if (files.image_2) {
        formData.append("image_2", files.image_2);
      }
      if (files.image_3) {
        formData.append("image_3", files.image_3);
      }

      setLoading(true);
      try {
        // const res = await updateVendorOrder(formData);
        // NotificationManager  .success("Order Created");
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
      full_name: Yup.string().required("Name is Required"),
      company_name: Yup.string().required("Company Name Required"),
      company_overview: Yup.string().required("Company Brief Required"),
      vendor_category: Yup.string().required("Category is Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
      password_confirmation: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Passwords must match"
      ),
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
      setVendor(res.vendor);
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

        <div className="field">
          <select
            onChange={formik.handleChange}
            value={formik.values.vendor_category}
            name="vendor_category"
          >
            <option value="">Select category</option>

            {vendorCategories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
          {formik.touched && formik.errors.vendor_category && (
            <span className="error">{formik.errors.vendor_category}</span>
          )}
        </div>

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
          <h4>Upload Your Work Images</h4>

          <div className="my-4">
            <div className="flex gap-3">
              <FileUploader
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
              />
            </div>
          </div>
        </div>

        <div className="em__spacer" style={{ height: "10px" }}></div>

        <div className="agree__info">
          <div className="form-radio">
            <input
              className="mr-3"
              type="checkbox"
              name="bp_quote"
              id="bp_quote"
            />
            <label htmlFor="bp_quote">
              <b>Legal disclaimer -</b>
              By clicking here, you acknowledge and agree to adhere to the
              highest standards when serving our clients, including the
              commitment to respond to all leads within 24 hours. Failure to
              meet this requirement may result in the opportunity to send a
              quotation being forfeited. Additionally, you understand that our
              platform acts as a connection facilitator, and any transactions or
              agreements are solely between you and the client. Please carefully
              review and accept these terms before proceeding with your Vendor
              Registration Subscription.
            </label>
          </div>
        </div>

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
