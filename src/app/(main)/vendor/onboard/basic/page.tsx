"use client";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import Api from "@/lib/api";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";
import { ArrowRight } from "@/components/icons";
import FileUploader from "@/components/FileUploader";

const VendorOnboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  //   const [services, setServices] = useState([]);
  const [files, setFiles] = useState({
    image_1: null,
    image_2: null,
    video: null,
  });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      company_name: "",
      overview: "",
      website: "",
      services: "",
      phone: "",
      socials: "",
    },
    onSubmit: async (data) => {
      setLoading(true);
      const combined_data: any = { ...data };

      console.log(combined_data);

      let formData = new FormData();

      for (var key in combined_data) {
        formData.append(key, combined_data[key]);
      }

      if (files.image_1) {
        formData.append("image_1", files.image_1);
      }
      if (files.image_2) {
        formData.append("image_2", files.image_2);
      }
      if (files.video) {
        formData.append("files", files.video);
      }

      try {
        const res = await Api.post("/api/vendors/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        router.push(`vendor/onboard/payment/${res.data.record.id}`);
        NotificationManager.success("Your profile was successfully created!");
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
    },
    validationSchema: Yup.object().shape({
      company_name: Yup.string().required("Company name is Required"),
      overview: Yup.string().required("Company overview is Required"),
      services: Yup.string().required("Services is Required"),
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

  return (
    <div className="w-80 m-auto my-4 py-12">
      <div>
        <h2 className="em__fancy__text sm:text-[53px] sm:leading-[54px]">
          {" "}
          Profile Setup
        </h2>
        <p>Kindly fill your basic Information</p>

        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.company_name}
              name="company_name"
              placeholder="Company Name "
            />
            {formik.touched && formik.errors.company_name && (
              <span className="error">{formik.errors.company_name}</span>
            )}
          </div>

          <div className="field textarea h-[100px]">
            <textarea
              onChange={formik.handleChange}
              value={formik.values.overview}
              name="overview"
              placeholder="Company overview "
              rows={3}
            ></textarea>
            {formik.touched && formik.errors.overview && (
              <span className="error">{formik.errors.overview}</span>
            )}
          </div>

          <div className="field">
            <input
              type="link"
              onChange={formik.handleChange}
              value={formik.values.website}
              name="website"
              placeholder="example.com"
            />
            {formik.touched && formik.errors.website && (
              <span className="error">{formik.errors.website}</span>
            )}
          </div>

          <div className="field">
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.services}
              name="services"
              placeholder="Please enter services separated with commas (,) "
            />
            {formik.touched && formik.errors.services && (
              <span className="error">{formik.errors.services}</span>
            )}
          </div>

          <div className="field">
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              placeholder="Phone Number"
            />
            {formik.touched && formik.errors.phone && (
              <span className="error">{formik.errors.phone}</span>
            )}
          </div>

          <div className="field">
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.socials}
              name="socials"
              placeholder="Social media link separated with commas (,) "
            />
            {formik.touched && formik.errors.socials && (
              <span className="error">{formik.errors.socials}</span>
            )}
          </div>

          <hr />

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
              </div>
            </div>
          </div>
          <div>
            <h4>Upload Your Work Video</h4>

            <div className="w-[130px] my-4">
              <FileUploader
                type="video"
                handleChange={(e) => handleChange(e)}
                placeholder="Video"
                name="video"
                file={files.video}
                handleRemove={handleRemove}
              />
            </div>
          </div>

          <Button
            text="Proceed"
            classNames="block w-full"
            RightIcon={<ArrowRight />}
            loading={loading}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default VendorOnboard;
