"use client";
import { useCart } from "@/hooks/useCartProvider";
import { formattedMoney, getDiscount } from "@/lib/utils";
import { ICartItem } from "@/types";
import Image from "next/image";
import React, { FC, useState } from "react";

interface ComponentProps {
  cart: ICartItem;
}

const CartItem: FC<ComponentProps> = ({ cart }) => {
  const { removeCart, updateCart } = useCart();
  const [qty, setQty] = useState<number>(cart.qty || 0);

  const loaderProp = ({ src }: any) => {
    return src;
  };

  const update = () => {
    updateCart({ ...cart, qty });
  };

  return (
    <div className="cart__item">
      <div className="em__flex">
        <div className="display">
          <Image
            width={100}
            height={100}
            loader={loaderProp}
            src={cart.displayUrl || "/assets/images/s3.png"}
            alt="Cart"
          />
        </div>
        <div className="details">
          <div className="d1">
            <div>
              <div className="title">
                <h4>{cart.title}</h4>
              </div>
              <div className="price">
                {cart.discount > 0 && (
                  <span className="old">
                    {formattedMoney(getDiscount(cart.price, cart.discount))}
                  </span>
                )}
                <span className="new">$ {cart.price}</span>
              </div>
            </div>
            <div>
              <button className="del" onClick={() => removeCart(cart)}>
                Delete
              </button>
              <button className="up" onClick={update}>
                Update
              </button>
            </div>
          </div>
          <div className="d2">
            <div>
              <button
                disabled={qty == 1}
                className="button1"
                onClick={() => setQty((prev) => prev - 1)}
              >
                -
              </button>
              <input type="number" value={qty} />
              <button
                className="button2"
                onClick={() => setQty((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
