"use client";
import CartItem from "@/components/CartItem";
import { useCart } from "@/hooks/useCartProvider";
import { countries, formattedMoney } from "@/lib/utils";
import constants from "@/lib/utils/constants";
import { ICartItem } from "@/types";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import React, { useEffect, FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface PageProps {
  params: { type: string };
}

const SubCheckout: FC<PageProps> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [sub] = useState<any>(JSON.parse(localStorage.getItem("aiSub") as any));
  const [event_countries] = useState(["United Arab Emirates", "Nigeria"]);

  let total = 0;

  if (sub && sub.creative_ai_sub_upgrade) {
    total += constants.creative_ai_subscriptions.PRO;
  }
  if (sub && sub.creative_ai_sub) {
    total += constants.creative_ai_subscriptions.BASIC;
  }

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      country: "",
      zip: "",
      city: "",
      state: "",
      address: "",
      ep_quote: false,
      bp_quote: false,
      people_number: "",
      event_date: "",
      occasion: "",
      location: "",
      additional_request: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: async (data) => {
      setLoading(true);
      try {
        // const res = await createBackdropOrder(data);

        NotificationManager.success("Order Created");
        // const id = res.data.newOrder.id;
        // router.push(`/checkout/backdrop/payment/${id}`);
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

      setLoading(false);
    },
    validationSchema: Yup.object().shape({
      full_name: Yup.string().required("Name is Required"),
      country: Yup.string().required("Country Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
      password_confirmation: Yup.string().oneOf(
        [Yup.ref("password"), ""],
        "Passwords must match"
      ),
    }),
  });

  return (
    <div>
      <div className="em__banner S">
        <div className="inner">
          <h1>
            <span style={{ left: 0 }}>Checkout </span>
          </h1>

          <div className="em__breadcrome">
            <a href="/">Home</a>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="8"
              height="5"
              viewBox="0 0 8 5"
            >
              <image
                id="right-arrow_34_copy"
                data-name="right-arrow (34) copy"
                width="8"
                height="5"
                xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAZElEQVQImVXNwQmCAByF8V/ivS081ghSl6QtnMFLIwQ5kAQ5gN1qjVxAAuUfCvkd3/ceb5Pl5QdX1NZUuCTocMPxzx/mwTPFGQ0e2GJEi3u4KAQFXujnwhunEHGxsMOAL/a/EBP9gRHwPbUJlQAAAABJRU5ErkJggg=="
              />
            </svg>

            <span>Checkout</span>
          </div>
        </div>
      </div>

      <div className="em__checkout_body">
        <div className="container-x">
          <div className="em__body__wrapper">
            <div className="em__flex">
              <div className="checkout__info">
                <div className="billing">
                  <div className="title">
                    <h4>Billing Details</h4>
                  </div>

                  <form action="" className="comment__form">
                    <div className="field">
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.full_name}
                        placeholder="Full name *"
                        type="text"
                        name="full_name"
                      />
                      {formik.touched && formik.errors.full_name && (
                        <span className="error">{formik.errors.full_name}</span>
                      )}
                    </div>

                    <div className="field">
                      <select
                        onChange={formik.handleChange}
                        value={formik.values.country}
                        name="country"
                      >
                        <option value="">Select country</option>

                        {countries.map((country, i) => (
                          <option key={i} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched && formik.errors.country && (
                        <span className="error">{formik.errors.country}</span>
                      )}
                    </div>
                    <div className="field">
                      <input
                        placeholder="Town /City*"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        name="city"
                      />
                    </div>

                    <div className="field">
                      <input
                        placeholder="State*"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                        name="state"
                      />
                    </div>

                    <div className="field">
                      <input
                        placeholder="Zip"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.zip}
                        name="zip"
                      />
                    </div>

                    <div
                      className="em__spacer"
                      style={{ height: "10px" }}
                    ></div>

                    <div className="title ">
                      <h4>Account Details</h4>
                    </div>

                    <div className="field">
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        placeholder="Email Address*"
                        type="email"
                        name="email"
                      />
                      {formik.touched && formik.errors.email && (
                        <span className="error">{formik.errors.email}</span>
                      )}
                    </div>

                    <div className="field">
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="Password*"
                        type="password"
                        name="password"
                      />
                      {formik.touched && formik.errors.password && (
                        <span className="error">{formik.errors.password}</span>
                      )}
                    </div>

                    <div className="field">
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.password_confirmation}
                        placeholder="Password Confirmation*"
                        type="password"
                        name="password_confirmation"
                      />
                      {formik.touched &&
                        formik.errors.password_confirmation && (
                          <span className="error">
                            {formik.errors.password_confirmation}
                          </span>
                        )}
                    </div>

                    <div className="agree__info">
                      <div className="form-radio flex">
                        <input
                          type="checkbox"
                          className="mr-3"
                          name="bp_quote"
                          id="bp_quote"
                          onChange={formik.handleChange}
                          value={formik.values.bp_quote as any}
                        />
                        <label htmlFor="bp_quote">Request Quote</label>
                      </div>
                    </div>

                    {event_countries.includes(formik.values.country) && (
                      <div className="agree__info my-4">
                        <div className="form-radio">
                          <input
                            className="mr-3"
                            type="checkbox"
                            name="ep_quote"
                            id="ep_quote"
                            onChange={formik.handleChange}
                            value={formik.values.ep_quote as any}
                          />
                          <label htmlFor="ep_quote">
                            {" "}
                            Request Event Planning Quote
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Quote Request Section */}
                    {formik.values.ep_quote && (
                      <section>
                        <div className="field">
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.people_number}
                            placeholder="How many people?"
                            type="number"
                            name="people_number"
                          />
                          {formik.touched && formik.errors.people_number && (
                            <span className="error">
                              {formik.errors.people_number}
                            </span>
                          )}
                        </div>

                        <div className="field">
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.event_date}
                            placeholder="Event date"
                            type="date"
                            name="event_date"
                          />
                          {formik.touched && formik.errors.event_date && (
                            <span className="error">
                              {formik.errors.event_date}
                            </span>
                          )}
                        </div>

                        <div className="field">
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.occasion}
                            placeholder="Occasion"
                            type="text"
                            name="occasion"
                          />
                          {formik.touched && formik.errors.occasion && (
                            <span className="error">
                              {formik.errors.occasion}
                            </span>
                          )}
                        </div>

                        <div className="field">
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.location}
                            placeholder="Location"
                            type="text"
                            name="location"
                          />
                          {formik.touched && formik.errors.location && (
                            <span className="error">
                              {formik.errors.location}
                            </span>
                          )}
                        </div>

                        <div className="field">
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.additional_request}
                            placeholder="Additional Request"
                            type="text"
                            name="additional_request"
                          />
                          {formik.touched &&
                            formik.errors.additional_request && (
                              <span className="error">
                                {formik.errors.additional_request}
                              </span>
                            )}
                        </div>
                      </section>
                    )}
                    <br />
                    <br />

                    <button className="em__button primary">
                      Subscribe
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
                    </button>
                  </form>
                </div>
              </div>
              <div className="checkout__total">
                <div className="title">
                  <h4>Cart Total</h4>
                </div>

                <div className="cart__total">
                  {sub.creative_ai_sub && (
                    <div className="em__flex">
                      <h4>Creative Subscription</h4>
                      <span>
                        {formattedMoney(
                          constants.creative_ai_subscriptions.BASIC
                        )}{" "}
                      </span>
                    </div>
                  )}

                  {sub.creative_ai_sub_upgrade && (
                    <div className="em__flex">
                      <h4>Creative Subscription Pro</h4>
                      <span>
                        {formattedMoney(
                          constants.creative_ai_subscriptions.PRO
                        )}{" "}
                      </span>
                    </div>
                  )}
                  <hr />

                  <div className="em__flex">
                    <h4>Total</h4>
                    <span>${total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCheckout;
