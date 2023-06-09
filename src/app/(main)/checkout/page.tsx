"use client";
import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import { ArrowRight } from "@/components/icons";
import { useCart } from "@/hooks/useCartProvider";
import { ICartItem } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Checkout = () => {
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
                  <div className="title">
                    <h4>Billing Details</h4>
                  </div>

                  <form action="" className="comment__form">
                    <div className="field">
                      <input placeholder="Full name*" type="text" />
                    </div>

                    <div className="field">
                      <input placeholder="Street address*" type="text" />
                    </div>

                    <div className="field">
                      <input placeholder="Town /City*" type="text" />
                    </div>

                    <div className="field">
                      <input placeholder="State*" type="text" />
                    </div>

                    <div className="field">
                      <input placeholder="Zip" type="text" />
                    </div>

                    <div className="field">
                      <input placeholder="Email Address*" type="email" />
                    </div>

                    <div
                      className="em__spacer"
                      style={{ height: "10px" }}
                    ></div>

                    <div className="agree__info">
                      <div className="form-radio">
                        <input
                          type="radio"
                          name="shipping"
                          id="free_shipping"
                        />
                        <label htmlFor="free_shipping">
                          By ticking the confirmation box, you acknowledge and
                          understand that our AI system is a continuously
                          evolving platform that learns from daily requests.
                          While the adapted designs it generates strive for
                          originality, we cannot be held responsible if any
                          similarity arises unintentionally with designs
                          existing in the world of which we have no knowledge.
                        </label>
                      </div>
                    </div>
                    <br />

                    <Button
                      classNames="em__button primary"
                      text="Buy Production Files"
                      RightIcon={<ArrowRight />}
                    />
                  </form>
                </div>
              </div>
              <div className="checkout__total">
                <div className="title">
                  <h4>Cart Total</h4>
                </div>

                <div className="cart__total">
                  <div className="em__flex">
                    <h4>Subtotal</h4>
                    <span>$ {subTotal()} </span>
                  </div>

                  <div className="em__flex">
                    <h4>Shipping</h4>

                    <div>
                      <div className="form-radio">
                        <input type="radio" name="shipping" id="flat_rate" />
                        <label htmlFor="flat_rate">Flat Rate</label>
                      </div>
                      <div className="form-radio">
                        <input
                          type="radio"
                          name="shipping"
                          id="free_shipping"
                        />
                        <label htmlFor="free_shipping">Free Shipping</label>
                      </div>
                      <div className="form-radio">
                        <input type="radio" name="shipping" id="local_pickup" />
                        <label htmlFor="local_pickup">Flat Rate</label>
                      </div>
                      <br />
                      <span className="read__more">Change Address</span>
                    </div>
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
