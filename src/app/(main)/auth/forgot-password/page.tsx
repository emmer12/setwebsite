"use client";
import React, { FormEventHandler, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { ArrowRight } from "@/components/icons";
import { forgotPassword } from "@/lib/api/user.api";
const SignIn = () => {
  const router = useRouter();
  const { status } = useSession();

  const [loading, setLoading] = useState<boolean>(false);

  if (status === "authenticated") {
    router.push("/account");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async ({ email }) => {
      try {
        setLoading(true);

        await forgotPassword({ email });

        NotificationManager.success(
          `An email containing instructions on how to reset your password has been sent to ${email}`
        );

        formik.resetForm();
      } catch (error: any) {
        const err = error?.response?.data;
        if ([400, 404, 500].includes(error?.response?.status)) {
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
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
  });

  return (
    <div className="flex">
      <div className="w-full sm:w-1/2 flex-1">
        <div className="w-80 my-4 py-12 m-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="title">
              <h2 className="font-bold text-2xl">Forgot password</h2>
            </div>
            <div className="field">
              <label htmlFor="">Enter Your email to reset your password</label>
              <input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                placeholder="example@mail.com"
              />
              {formik.touched && formik.errors.email && (
                <span className="error">{formik.errors.email}</span>
              )}
            </div>

            <Button
              text="Reset"
              classNames="primary mt-4 w-full"
              RightIcon={<ArrowRight />}
              loading={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
