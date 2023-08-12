"use client";
import Button from "@/components/Button";
import React, { useState } from "react";
import Modal from "@/components/modal";
import { useSession } from "next-auth/react";
import LoginComponent from "@/components/LoginComponent";
import { NotificationManager } from "react-notifications";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowRight } from "@/components/icons";
import { createRequest } from "@/lib/api/vendor.api";

const RequestClient = ({ vendor }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const { status, data } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState(null);
  const { company_name, id } = vendor;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (data) => {
      try {
        setLoading(true);
        let userData: any = { ...data };
        userData.vendor_id = id;

        let formData = new FormData();

        for (var key in userData) {
          formData.append(key, userData[key]);
        }

        if (file) {
          formData.append("doc", file);
        }

        const res = await createRequest(formData);
        NotificationManager.success(
          `You Request has been sent to ${company_name} `,
          "Request sent!"
        );
        formik.resetForm();
        setOpen(false);
      } catch (err) {
        NotificationManager.error("Invalid Credentials", "Error message");
      } finally {
        setLoading(false);
      }
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Title Required"),
      description: Yup.string().required("Description Required"),
    }),
  });

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <div className="absolute bottom-[30px] right-[20px]">
        <Button onClick={() => setOpen(true)} text="Request Quote" />
      </div>

      <div>
        <Modal size="small" open={open} close={() => setOpen(false)}>
          {status == "authenticated" ? (
            <div>
              <div className="em__header text-center">
                <h2 className="text-[#8b5326] em__fancy__text font-extrabold text-2xl sm:text-5xl">
                  Request Quote from{" "}
                </h2>
                <h4 className="text-2xl">{company_name}</h4>
                {/* <span className="em__fancy__text">Courses</span> */}
                <p></p>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="text-start">
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

                  <div className="field textarea h-[100px]">
                    <textarea
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      name="description"
                      placeholder="Request description "
                      rows={3}
                    ></textarea>
                    {formik.touched && formik.errors.description && (
                      <span className="error">{formik.errors.description}</span>
                    )}
                  </div>

                  <div className="field ">
                    <label htmlFor="Doc">Attach Document</label>
                    <input
                      type="file"
                      id="doc"
                      placeholder="Attach Doc"
                      onChange={handleChange}
                    />
                  </div>

                  <Button
                    classNames="em__button primary mt-4"
                    text="Send Request"
                    RightIcon={<ArrowRight />}
                    loading={loading}
                  />
                </div>
              </form>
            </div>
          ) : (
            <LoginComponent
              callback={() => setOpen(false)}
              desc="kindly login to your account to send a quote request or Register"
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default RequestClient;
