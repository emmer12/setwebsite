"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Api from "@/lib/api";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import * as Yup from "yup";
import Link from "next/link";
import { useSession } from "next-auth/react";

const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/account");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: async ({ name, email, password }) => {
      setLoading(true);

      try {
        const res = await Api.post("/api/users/create", {
          name,
          email,
          password,
        });
        NotificationManager.success("Your account was successfully created!");
        router.push("/auth/signin");
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
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Password Required"),
      password_confirmation: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Passwords must match"
      ),
    }),
  });

  return (
    <div className="bg-white">
      <div className="w-80 m-auto  py-12 ">
        <form onSubmit={formik.handleSubmit}>
          <div className="title">
            <h2 className="font-bold text-2xl">Sign up</h2>
          </div>
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

          <div className="field">
            <input
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password_confirmation}
              name="password_confirmation"
              placeholder="********"
            />
            {formik.touched && formik.errors.password_confirmation && (
              <span className="error">
                {formik.errors.password_confirmation}
              </span>
            )}
          </div>

          <button disabled={loading} className="em__button primary mt-4 w-full">
            {loading ? (
              "loading.."
            ) : (
              <>
                Register
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="19"
                  height="5"
                  viewBox="0 0 19 5"
                >
                  <image
                    id="right-arrow_35_copy_2"
                    data-name="right-arrow (35) copy 2"
                    width="19"
                    height="5"
                    xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAFCAYAAACn39dKAAAAVElEQVQYla3QsQ1AUBhF4U+oTaFSSERjBBYxicQCljCJCaxhAQX5V3jPTW5zi5OTKzMbLhSBqVCiTmQ2aHFijmHH+0OP0BvQJZotGPFgyv1sxY0ePoJ2GONIaxKpAAAAAElFTkSuQmCC"
                  />
                </svg>
              </>
            )}
          </button>
        </form>
        <div className="float-right mt-4">
          <Link href="/auth/signin">
            Already have an account?{" "}
            <span className="text-[#986a47]">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
