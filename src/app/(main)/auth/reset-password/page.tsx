"use client";
import { useState } from "react";
import { useFormik } from "formik";
import useSWR from "swr";
import * as Yup from "yup";
import { NotificationManager } from "react-notifications";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { ArrowRight, Loading } from "@/components/icons";
import { resetPassword, validateToken } from "@/lib/api/user.api";
import { useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState("");
  const searchParams: any = useSearchParams();
  const token = searchParams.get("token");

  console.log(token);
  const { data, error, isLoading } = useSWR(`${token}`, validateToken, {
    revalidateOnFocus: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  if (status === "authenticated") {
    router.push("/account");
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    onSubmit: async ({ password, password_confirmation }) => {
      try {
        setLoading(true);
        let id = data?.id as string;

        await resetPassword({ id, password, password_confirmation, token });

        NotificationManager.success(
          "Password changed successfully!",
          "Success Message"
        );

        router.push("/auth/signin");

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
      password: Yup.string().required("Password Required"),
      password_confirmation: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Passwords must match"
      ),
    }),
  });

  if (isLoading) {
    return (
      <div className="h-[20p0x] bg-white flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="w-full sm:w-1/2 flex-1">
        <div className="w-80 my-4 py-12 m-auto">
          {error ? (
            <div>{error.response.data.msg || "Opps,something went wrong"}</div>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="title">
                <h2 className="font-bold text-2xl">Reset password</h2>
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
              <Button
                text="Reset"
                classNames="primary mt-4 w-full"
                RightIcon={<ArrowRight />}
                loading={loading}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
