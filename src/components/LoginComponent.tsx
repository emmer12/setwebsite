"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { NotificationManager } from "react-notifications";
import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginComponent = ({
  desc,
  callback,
}: {
  desc: string;
  callback: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        setLoading(true);
        const res: any = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });

        if (res.status == 200) {
          callback();
          NotificationManager.success("Welcome back!");
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (err) {
        NotificationManager.error("Error message", "Invalid Credentials");
      } finally {
        router.refresh();
        setLoading(false);
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Password Required"),
    }),
  });

  return (
    <div className="m-auto">
      <div className="hidden sm:block w-full flex-1 pt-8">
        <div className="em__header center">
          <h2 className="text-[#8b5326] em__fancy__text font-extrabold text-2xl sm:text-5xl">
            Login to Continue
          </h2>
          {/* <span className="em__fancy__text">Courses</span> */}
          <p>
            {desc}{" "}
            <Link href="/auth/signup" className="text-[#8b5326]">
              here
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full flex-1">
        <div className="w-full py-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="field">
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
            <div className="field">
              <input
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                placeholder="********"
              />
              {formik.touched && formik.errors.password && (
                <span className="error">{formik.errors.password}</span>
              )}
            </div>

            <Button
              text="Login"
              classNames="primary mt-4 w-full"
              loading={loading}
            />

            <div className="float-right mt-4">
              <Link href="/auth/signup">Don&apos;t have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
