"use client";
import React, { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/navigation";
const SignIn = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

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
          NotificationManager.success("Welcome back!");
          router.push("/member/design");
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (err) {
        NotificationManager.error("Error message", "Invalid Credentials");
      } finally {
        setLoading(false);
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Password Required"),
    }),
  });

  return (
    <div className="flex">
      <div className="hidden sm:block w-1/2 flex-1 pt-28">
        <div className="em__header center">
          <h2 className="text-[#8b5326] em__fancy__text font-extrabold text-2xl sm:text-5xl">
            Welcome Back
          </h2>
          {/* <span className="em__fancy__text">Courses</span> */}
          <p>kindly select the account you would like to log into. options</p>
        </div>
      </div>
      <div className="w-full sm:w-1/2 flex-1">
        <div className="w-80 my-4 py-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="title">
              <h2 className="font-bold text-2xl">Sign in</h2>
            </div>
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

            <button
              disabled={loading}
              className="em__button primary mt-4 w-full"
            >
              {loading ? (
                "loading.."
              ) : (
                <>
                  Login
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

            <div className="float-right mt-4">
              <Link href="/auth/signup">Don&apos;t have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
