"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import Api from "@/lib/api";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";
import FileUploader from "@/components/FileUploader";
const CreateBackdrop = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState({
    preview: null,
    file: null,
  });

  const router = useRouter();

  const handleRemove = (field: string) => {
    setFiles((prev) => {
      return { ...prev, [field]: null };
    });
  };

  const handleChange = (e: any) => {
    const file = e.target.files[0];

    setFiles((prev) => {
      return { ...prev, [e.target.name]: file };
    });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
    },
    onSubmit: async ({ title, description, price }) => {
      setLoading(true);

      try {
        const res = await Api.post("/api/users/create", {
          title,
          description,
          price,
        });
        NotificationManager.success("Your account was successfully created!");

        router.push("/vendor/onboard/basic");
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
      title: Yup.string().required("Name is Required"),
      description: Yup.string().required("Required"),
      price: Yup.string().required("Required"),
    }),
  });

  return (
    <div>
      <div className="flex justify-between items-center py-5">
        <div>
          <h4 className="text-[24px]">Create Backdrop </h4>
        </div>
      </div>
      <div className="max-w-[640px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <input
              type="type"
              onChange={formik.handleChange}
              value={formik.values.title}
              name="title"
              placeholder="Title"
            />
            {formik.touched && formik.errors.title && (
              <span className="error">{formik.errors.title}</span>
            )}
          </div>

          <div className="field textarea h-[100px]">
            <textarea
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              placeholder="Backdrop description "
              rows={3}
            ></textarea>
            {formik.touched && formik.errors.description && (
              <span className="error">{formik.errors.description}</span>
            )}
          </div>

          <div className="field">
            <input
              type="type"
              onChange={formik.handleChange}
              value={formik.values.price}
              name="price"
              placeholder="Price"
            />
            {formik.touched && formik.errors.price && (
              <span className="error">{formik.errors.price}</span>
            )}
          </div>

          <div>
            <h4>Preview Image</h4>

            <div className="w-[130px] my-4">
              <FileUploader
                type="image"
                handleChange={(e) => handleChange(e)}
                placeholder="Preview"
                name="preview"
                file={files.preview}
                handleRemove={handleRemove}
              />
            </div>

            <div className=" my-4">
              <h4>Backdrop File</h4>

              <input
                type="file"
                placeholder="Backdrop Files"
                onChange={() => handleRemove}
                name="file"
              />
            </div>
          </div>

          <Button
            text="Create"
            classNames="block w-full"
            loading={loading}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateBackdrop;
