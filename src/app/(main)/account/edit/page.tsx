"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Api from "@/lib/api";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import * as Yup from "yup";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Button from "@/components/Button";

const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data, update } = useSession();
  const router = useRouter();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  //   document.addEventListener('visibilitychange',()=>{
  //     !document.hidden && __NEXTAUTH._getSession({event:'visibilitychange'})
  //   })

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    onSubmit: async (data) => {
      setLoading(true);

      try {
        const res = await Api.patch("/api/users/create", data);
        await update({
          ...data,
          user: {
            name: data.name,
          },
        });
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
      name: Yup.string().required("Name is Required"),
    }),
  });

  const formikP = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    onSubmit: async (data) => {
      setLoading(true);

      try {
        const res = await Api.patch("/api/users/update-password", data);
        NotificationManager.success(
          "Your account password was successfully updated!"
        );
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
      password: Yup.string().required("Password Required"),
      password_confirmation: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Passwords must match"
      ),
    }),
  });

  useEffect(() => {
    formik.setFieldValue("name", data?.user.name);
    formik.setFieldValue("email", data?.user.email);
  }, []);

  return (
    <div className="bg-white">
      <div className="title">
        <h2 className="font-bold text-2xl">Account Update</h2>
      </div>
      <div className="flex flex-col sm:flex-row max-w-full py-4 gap-4">
        <div className="flex-1">
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
              <input
                type="type"
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                placeholder="Fullname"
              />
              {formik.touched && formik.errors.name && (
                <span className="error">{formik.errors.name}</span>
              )}
            </div>
            <div className="field">
              <input
                type="email"
                disabled
                aria-disabled
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                placeholder="example@mail.com"
              />
              {formik.touched && formik.errors.email && (
                <span className="error">{formik.errors.email}</span>
              )}
            </div>
            <Button text="Update" classNames="sm" loading={loading} />
          </form>
        </div>

        <div className="flex-1">
          <form onSubmit={formikP.handleSubmit}>
            <div className="field">
              <label htmlFor="password">Password </label>
              <input
                type="password"
                onChange={formikP.handleChange}
                value={formikP.values.password}
                name="password"
                placeholder="********"
                id="password"
              />
              {formikP.touched && formikP.errors.password && (
                <span className="error">{formikP.errors.password}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="password_conformation">
                Password Confirmation{" "}
              </label>
              <input
                type="password"
                onChange={formikP.handleChange}
                value={formikP.values.password_confirmation}
                name="password_confirmation"
                placeholder="********"
                id="password_conformation"
              />
              {formikP.touched && formikP.errors.password_confirmation && (
                <span className="error">
                  {formikP.errors.password_confirmation}
                </span>
              )}
            </div>

            <div className="float-right">
              <Button text="Update" classNames="sm" loading={loading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
