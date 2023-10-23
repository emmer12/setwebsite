"use client";
import Button from "@/components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import Api from "@/lib/api";

const ContactFormClient = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      message: "",
    },
    onSubmit: async (data) => {
      try {
        setLoading(true);
        const res = await Api.post("/api/contact-form", data);
        setLoading(false);
        NotificationManager.success("Contact form submitted");
        formik.resetForm();
      } catch (err) {
        setLoading(false);
        NotificationManager.error(
          "Opps, something went wrong. Please try again later"
        );
      }
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name is Required"),
      last_name: Yup.string().required("last Name is Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      message: Yup.string().required("Message is Required"),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex gap-3">
        <div className="field">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={formik.handleChange}
            value={formik.values.first_name}
          />
          {formik.touched && formik.errors.first_name && (
            <span className="error">{formik.errors.first_name}</span>
          )}
        </div>

        <div className="field">
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={formik.handleChange}
            value={formik.values.last_name}
          />
          {formik.touched && formik.errors.last_name && (
            <span className="error">{formik.errors.last_name}</span>
          )}
        </div>
      </div>

      <div className="field m-0">
        <input
          type="email"
          name="email"
          placeholder="example@mail.com"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched && formik.errors.email && (
          <span className="error">{formik.errors.email}</span>
        )}
      </div>

      <div className="field textarea h-[100px]">
        <textarea
          placeholder="Message"
          rows={3}
          name="message"
          onChange={formik.handleChange}
          value={formik.values.message}
        ></textarea>
        {formik.touched && formik.errors.message && (
          <span className="error">{formik.errors.message}</span>
        )}
      </div>

      <Button
        text="Submit"
        loading={loading}
        disabled={loading}
        classNames="em__button primary"
      />
    </form>
  );
};

export default ContactFormClient;
