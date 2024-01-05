"use client";
import Button from "@/components/Button";
import FeatureList from "@/components/FeatureList";
import ServiceCard from "@/components/ServicePrice";
import { ArrowRight } from "@/components/icons";
import { NotificationManager } from "react-notifications";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import Api from "@/lib/api";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

const OnboardPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState("");
  const router = useRouter();

  const handleSub = () => {
    try {
      typeof window !== "undefined" &&
        localStorage.setItem("vSub", JSON.stringify({ vendor_sub: true }));
      router.push("/vendor/onboard/upgrade");
    } catch (err: any) {
      alert("Opps, Something went wrong");
    }
  };

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
        router.push("/account/ai/dee");
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

  const features = useMemo(() => {
    return [
      "Begin designing your backdrops, wedding stages, exhibition stands, and cakes for free! Register to kickstart your creative ",
    ];
  }, []);
  return (
    <div>
      {" "}
      <div className="em__banner__2">
        <div className="inner">
          <h1>
            Experience
            <span className="!inline">Dee</span>
          </h1>
          <br />
          <h1> your digital designer</h1>
        </div>
      </div>
      <div className="em__dee bg-white">
        <div className="container">
          <div className="em__body__wrapper">
            <div className=" my-5">
              {/* <h4 className="text-xl font-bold mb-5">
                Vendors Applicable to Register:
              </h4> */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-1/2">
                  <video
                    autoPlay={true}
                    loop
                    controls
                    src="https://static.vecteezy.com/system/resources/previews/023/607/690/mp4/vdo-mp4-helix-human-dna-3-d-rendering-video.mp4"
                  ></video>
                </div>
                <div className="w-full sm:w-1/2">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="title">
                      <h2 className="font-bold text-2xl text-center">
                        Sign Up to try Dee for Free
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-1 ">
                      <div className="flex gap-4 align-center text-base py-3 f__items">
                        <span>
                          Begin designing your backdrops, wedding stages,
                          exhibition stands, and cakes for free! Register to
                          kickstart your creative journey with ten Free designs
                        </span>
                      </div>
                    </div>

                    {/* <div className="about__service text-center ">
                      <p className="py-5  font-bold"></p>
                    </div> */}
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
                      {formik.touched &&
                        formik.errors.password_confirmation && (
                          <span className="error">
                            {formik.errors.password_confirmation}
                          </span>
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
                </div>

                {/* <Image
                  height={350}
                  width={350}
                  src="/assets/images/vendor.png"
                  alt="World Image"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardPage;
