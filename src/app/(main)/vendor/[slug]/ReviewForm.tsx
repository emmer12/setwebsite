"use client";
import Button from "@/components/Button";
import { Star } from "@/components/icons";
import classNames from "classnames";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { NotificationManager } from "react-notifications";
import { createReview } from "@/lib/api/vendor.api";

const ReviewForm = ({ id }: { id: string }) => {
  const [rating, setRating] = useState(0);
  const { status, data } = useSession();
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      message: "",
      full_name: "",
      email: "",
      rate: 0,
    },
    onSubmit: async (data) => {
      try {
        if (rating < 1) throw Error("Kindly provide a rating, if possible.");
        data.rate = rating;
        setLoading(true);

        const res = await createReview(id, data);

        NotificationManager.success("Thank you for providing your rating.");

        formik.resetForm();
        setRating(0);
      } catch (error: any) {
        const err = error?.response?.data;
        if ([400, 500].includes(error?.response?.status)) {
          NotificationManager.error(
            err?.msg || err?.error.errors[0].message || err.error.message,
            "Error message"
          );
        } else {
          NotificationManager.error(
            error.message || "Opps,Something went wrong",
            "Error message"
          );
        }
      } finally {
        setLoading(false);
      }
    },
    validationSchema:
      status == "authenticated"
        ? Yup.object().shape({
            message: Yup.string().required("Message is Required"),
          })
        : Yup.object().shape({
            full_name: Yup.string()
              .required("Name is Required")
              .test(
                "Please Enter your full name",
                (val) => val.split(" ").length >= 2
              ),

            email: Yup.string()
              .email("Invalid email")
              .required("Email Required"),
            message: Yup.string().required("Message is Required"),
          }),
  });

  useEffect(() => {
    if (status == "authenticated") {
      formik.setFieldValue("full_name", data.user.name);
      formik.setFieldValue("email", data.user.email);
    }
  }, [status]);

  return (
    <div>
      <div className="em__comment__form">
        <div style={{ lineHeight: "20px" }} className="em__header_2">
          <h1 style={{ lineHeight: "20px", fontSize: "32px" }}>Post A</h1>
          <span
            style={{ lineHeight: "20px", fontSize: "52px" }}
            className="em__fancy__text"
          >
            Review
          </span>
        </div>

        <form
          action=""
          className="comment__form "
          onSubmit={formik.handleSubmit}
        >
          <div className="flex gap-3 star__con">
            {Array.from(Array(5)).map((_, i) => (
              <div
                key={i}
                onClick={() => setRating(i + 1)}
                onMouseOver={() => setRating(i + 1)}
                onTouchStart={() => setRating(i + 1)}
                className={classNames("cursor-pointer star__item", {
                  filled: i + 1 <= rating && rating > 0,
                })}
              >
                <Star />
              </div>
            ))}
          </div>
          <div className="field textarea">
            <textarea
              placeholder=""
              rows={3}
              name="message"
              onChange={formik.handleChange}
              value={formik.values.message}
            ></textarea>

            {formik.touched && formik.errors.message && (
              <span className="error">{formik.errors.message}</span>
            )}
          </div>
          <div className="field">
            <input
              placeholder="Email Address"
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched && formik.errors.email && (
              <span className="error">{formik.errors.email}</span>
            )}
          </div>
          <div className="field">
            <input
              placeholder="Fullname"
              name="full_name"
              onChange={formik.handleChange}
              value={formik.values.full_name}
              type="text"
            />
            {formik.touched && formik.errors.full_name && (
              <span className="error">{formik.errors.full_name}</span>
            )}
          </div>

          <div className="em__spacer" style={{ height: "10px" }}></div>

          <Button text="Submit" loading={loading} disabled={loading} />
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
