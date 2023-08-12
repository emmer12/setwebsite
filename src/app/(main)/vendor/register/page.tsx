"use client";
import Button from "@/components/Button";
import { ArrowRight, TimesCircle } from "@/components/icons";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NotificationManager } from "react-notifications";
import FileUploader from "@/components/FileUploader";
import { createVendor, getFormData } from "@/lib/api/vendor.api";
import { signIn } from "next-auth/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const countries = [{ name: "United Arab Emirates", code: "AE" }];

const citiesUAE = [
  { name: "Abu Dhabi" },
  { name: "Dubai" },
  { name: "Sharjah" },
  { name: "Al Ain" },
  { name: "Ajman" },
  { name: "Ras Al Khaimah" },
  { name: "Fujairah" },
  { name: "Umm Al Quwain" },
  { name: "Khor Fakkan" },
  { name: "Dibba Al-Fujairah" },
  { name: "Dibba Al-Hisn" },
  { name: "Al-Madam" },
  { name: "Al Hamriyah" },
  { name: "Al-Jazirah Al-Hamra" },
  { name: "Masafi" },
  { name: "Al-Dhaid" },
  { name: "Al-Madam" },
  { name: "Hatta" },
  {
    name: "All Cities",
  },
];

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [event_countries] = useState(["United Arab Emirates", "Nigeria"]);
  const router = useRouter();
  const { status, data } = useSession();
  const [sinput, setSInput] = useState("");
  const [sub] = useState<any>(
    typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("vSub") as any)
  );

  const { isLoading, data: formData } = useSWR(
    "/api/vendors/checkout/form-data",
    getFormData
  );

  const [files, setFiles] = useState({
    image_1: null,
    image_2: null,
    image_3: null,
  });

  let total = 0;

  const formik = useFormik({
    initialValues: {
      full_name: "",
      company_name: "",
      company_overview: "",
      company_email: "",
      email: "",
      password: "",
      password_confirmation: "",
      company_location: "",
      country: "",
      city: "",
      license_number: "",
      coverage_cities: [],
      whatsapp_number: "",
      office_number: "",
      website: "",
      instagram: "",
      vendorCategoryId: "",
      legal: "",
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

      if (!files.image_1) {
        NotificationManager.error(
          "Error message",
          "At least one image is required"
        );
        return;
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
      if (sub && sub.quote_sub) {
        formData.append("quote_sub", sub.quote_sub);
      }
      if (sub && sub.vendor_sub) {
        formData.append("profile_sub", sub.vendor_sub);
      }

      setLoading(true);
      try {
        const res = await createVendor(formData);

        if (status == "unauthenticated") {
          await signIn("credentials", {
            email: userData.email,
            password: userData.password,
            redirect: false,
          });
        }

        NotificationManager.success("Registration Successful");
      } catch (error: any) {
        const err = error?.response?.data;
        if (error?.response?.status == 400) {
          NotificationManager.error(
            err?.msg || err?.error.errors[0].message || err.error.message,
            "Error message"
          );
        } else {
          NotificationManager.error(
            "Error message",
            "Opps,Something went wrong"
          );
        }
      } finally {
        setLoading(false);
      }

      setLoading(false);
    },
    validationSchema:
      status == "authenticated"
        ? Yup.object().shape({
            full_name: Yup.string().required("Name is Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            company_name: Yup.string().required("Company Name Required"),
            legal: Yup.bool().oneOf([true], "Legal agreement must be checked"),
            company_overview: Yup.string().required("Company Brief Required"),
          })
        : Yup.object().shape({
            full_name: Yup.string().required("Name is Required"),
            company_name: Yup.string().required("Company Name Required"),
            company_overview: Yup.string().required("Company Brief Required"),
            legal: Yup.bool().oneOf([true], "Legal agreement must be checked"),
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
    if (status == "authenticated") {
      formik.setFieldValue("full_name", data.user.name);
      formik.setFieldValue("email", data.user.email);
    }
  }, [status]);

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
      <div className="em__checkout_body ">
        <div className="container-x">
          <div className="em__body__wrapper">
            <div className="">
              <div className="m-auto w-full sm:w-1/2">
                <div className="billing">
                  <div className="title ">
                    <h4>Registration Details</h4>
                  </div>

                  <form
                    onSubmit={formik.handleSubmit}
                    className="comment__form"
                  >
                    <div className="field">
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.company_name}
                        placeholder="Company name*"
                        name="company_name"
                        type="text"
                      />
                      {formik.touched && formik.errors.company_name && (
                        <span className="error">
                          {formik.errors.company_name}
                        </span>
                      )}
                    </div>

                    <div className="field_wrapper">
                      <span className="hint">
                        Kindly write a detailed brief bio as it will be
                        displayed in your profile
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
                          <span className="error">
                            {formik.errors.company_overview}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="field_wrapper">
                      <span className="hint">
                        This email will be used for communication and leads sent
                        to it and clients will use to communicate it
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
                          <span className="error">
                            {formik.errors.company_email}
                          </span>
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
                              formik.setFieldValue(
                                "subCategory",
                                selectedOption
                              );
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
                          <span className="error">
                            {formik.errors.coverage_cities}
                          </span>
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
                    {/* <div className="field_wrapper">
                      <span className="hint">
                        Kindly include services you provide
                      </span>
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
                    </div> */}

                    <div className="field">
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.license_number}
                        placeholder="Company License Number *"
                        name="license_number"
                        type="text"
                      />
                      {formik.touched && formik.errors.license_number && (
                        <span className="error">
                          {formik.errors.license_number}
                        </span>
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
                        <span className="error">
                          {formik.errors.whatsapp_number}
                        </span>
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
                        <span className="error">
                          {formik.errors.office_number}
                        </span>
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

                    <div
                      className="em__spacer"
                      style={{ height: "10px" }}
                    ></div>

                    {status === "unauthenticated" && (
                      <div>
                        <div className="title ">
                          <h4>Account Details</h4>
                        </div>

                        <div className="field">
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.full_name}
                            placeholder="Full name *"
                            type="text"
                            name="full_name"
                          />
                          {formik.touched && formik.errors.full_name && (
                            <span className="error">
                              {formik.errors.full_name}
                            </span>
                          )}
                        </div>

                        <div className="field">
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="Email Address*"
                            type="email"
                            name="email"
                          />
                          {formik.touched && formik.errors.email && (
                            <span className="error">{formik.errors.email}</span>
                          )}
                        </div>

                        <div className="field">
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            placeholder="Password*"
                            type="password"
                            name="password"
                          />
                          {formik.touched && formik.errors.password && (
                            <span className="error">
                              {formik.errors.password}
                            </span>
                          )}
                        </div>

                        <div className="field">
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.password_confirmation}
                            placeholder="Password Confirmation*"
                            type="password"
                            name="password_confirmation"
                          />
                          {formik.touched &&
                            formik.errors.password_confirmation && (
                              <span className="error">
                                {formik.errors.password_confirmation}
                              </span>
                            )}
                        </div>
                      </div>
                    )}

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

                    <div
                      className="em__spacer"
                      style={{ height: "10px" }}
                    ></div>

                    <div className="agree__info">
                      <div className="form-radio">
                        <input
                          className="mr-3"
                          type="checkbox"
                          name="legal"
                          onChange={formik.handleChange}
                          id="legal"
                          value={formik.values.legal}
                          checked={!!formik.values.legal}
                        />
                        <label htmlFor="legal">
                          <b>Legal disclaimer -</b>
                          By clicking here, you acknowledge and agree to adhere
                          to the highest standards when serving our clients,
                          including the commitment to respond to all leads
                          within 24 hours. Failure to meet this requirement may
                          result in the opportunity to send a quotation being
                          forfeited. Additionally, you understand that our
                          platform acts as a connection facilitator, and any
                          transactions or agreements are solely between you and
                          the client. Please carefully review and accept these
                          terms before proceeding with your Vendor Registration
                          Subscription.
                        </label>
                      </div>
                    </div>
                    {formik.touched && formik.errors.legal && (
                      <span className="error">{formik.errors.legal}</span>
                    )}

                    <Button
                      classNames="em__button primary"
                      text="Register"
                      RightIcon={<ArrowRight />}
                      loading={loading}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
