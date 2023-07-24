"use client";
import Button from "@/components/Button";
import { Basket } from "@/components/icons";
import { useCart } from "@/hooks/useCartProvider";
import { formattedMoney } from "@/lib/utils";
import { IBackdrop, IBackdropFileType } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddCardComponent = ({ backdrop }: { backdrop: IBackdrop }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [license, setLicense] = useState<IBackdropFileType>(
    IBackdropFileType.personal_price
  );

  const addCart = (backdrop: IBackdrop) => {
    const { id, title, imageUrl, personal_price, commercial_price, discount } =
      backdrop;

    const data = {
      id,
      title,
      imageUrl,
      qty: 1,
      discount,
      price_type: license,
      price:
        license === IBackdropFileType.personal_price
          ? personal_price
          : commercial_price,
    };
    addToCart(data);

    router.push("/checkout/backdrop");
  };

  return (
    <div>
      <div className="field mt-0">
        <select
          onChange={(e: any) => setLicense(e.target.value)}
          value={license}
          name="Select License"
        >
          <option value="" disabled>
            Select country
          </option>
          <option value={IBackdropFileType.personal_price}>
            Personal License ({formattedMoney(backdrop.personal_price)})
          </option>

          <option value={IBackdropFileType.commercial_price}>
            Commercial License ({formattedMoney(backdrop.commercial_price)})
          </option>
        </select>
      </div>
      <Button
        disabled={!!!license}
        onClick={() => addCart(backdrop)}
        classNames="em__button primary block"
        RightIcon={<Basket />}
        text="Add to Cart"
      />
    </div>
  );
};

export default AddCardComponent;
