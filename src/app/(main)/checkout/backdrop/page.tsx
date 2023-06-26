"use client";
import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import { ArrowRight } from "@/components/icons";
import { useCart } from "@/hooks/useCartProvider";
import { countries } from "@/lib/utils";
import { ICartItem } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { createBackdropOrder } from "@/lib/api/backdrop.api";
import * as Yup from "yup";
import { NotificationManager } from "react-notifications";

const Checkout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [event_countries] = useState(["United Arab Emirates", "Nigeria"]);
  const { cart, subTotal } = useCart();
  const router = useRouter();

  // useEffect(() => {
  //   if (cart.length < 1) {
  //     router.push("/");
  //   }
  // }, []);

  // if (cart.length < 1) {
  //   router.push("/");
  // }

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      email_confirmation: "",
      country: "",
      address: "",
      ep_quote: false,
      bp_quote: false,
      people_number: "",
      event_date: "",
      occasion: "",
      location: "",
      additional_request: "",
    },
    onSubmit: async ({
      full_name,
      email,
      email_confirmation,
      country,
      address,
      ep_quote,
      bp_quote,
      people_number,
      event_date,
      occasion,
      location,
      additional_request,
    }) => {
      setLoading(true);
      try {
        const res = await createBackdropOrder({
          full_name,
          email,
          email_confirmation,
          country,
          address,
          items: JSON.stringify(cart),
          total: subTotal(),
          ep_quote,
          bp_quote,
          people_number,
          event_date,
          occasion,
          location,
          additional_request,
        });

        NotificationManager.success("Order Created");
        const id = res.data.newOrder.id;
        router.push(`/checkout/backdrop/payment/${id}`);
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
      email_confirmation: Yup.string().oneOf(
        [Yup.ref("email"), ""],
        "Passwords must match"
      ),
    }),
  });

  return (
    <div>
      <div className="em__banner checkout">
        <div className="inner">
          <h1>
            <span style={{ left: 0 }}>Checkout</span>
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
                <div className="cart">
                  {cart.map((c: ICartItem, i: number) => (
                    <CartItem cart={c} key={i} />
                  ))}
                </div>
                <hr />
                <br />
                <div className="billing">
                  <div className="title ">
                    <h4>Billing Details</h4>
                  </div>

                  <form
                    onSubmit={formik.handleSubmit}
                    className="comment__form"
                  >
                    <div className="field">
                      <input
                        onChange={formik.handleChange}
                        value={formik.values.full_name}
                        placeholder="Full name*"
                        name="full_name"
                        type="text"
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
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        name="address"
                        placeholder="Street address*"
                        type="text"
                      />
                    </div>

                    {/* <div className="field">
                      <input placeholder="Zip" type="text" />
                    </div> */}

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
                        value={formik.values.email_confirmation}
                        placeholder="Confirm Email Address*"
                        type="email"
                        name="email_confirmation"
                      />
                      {formik.touched && formik.errors.email_confirmation && (
                        <span className="error">
                          {formik.errors.email_confirmation}
                        </span>
                      )}
                    </div>

                    <div
                      className="em__spacer"
                      style={{ height: "10px" }}
                    ></div>

                    <div className="agree__info">
                      <div className="form-radio">
                        <input
                          className="mr-3"
                          type="checkbox"
                          name="bp_quote"
                          id="bp_quote"
                          onChange={formik.handleChange}
                          value={formik.values.bp_quote as any}
                        />
                        <label htmlFor="bp_quote">
                          Request Backdrop Production Quote
                        </label>
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

                    <Button
                      classNames="em__button primary"
                      text="Buy Production Files"
                      RightIcon={<ArrowRight />}
                      loading={loading}
                    />
                  </form>
                </div>
              </div>
              <div className="checkout__total mt-12 sm:mt-0">
                <div className="title">
                  <h4>Cart Total</h4>
                </div>

                <div className="cart__total">
                  <div className="em__flex">
                    <h4>Subtotal</h4>
                    <span>$ {subTotal()} </span>
                  </div>
                  <hr />

                  <div className="em__flex">
                    <h4>Total</h4>
                    <span>$100.00</span>
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

export default Checkout;
