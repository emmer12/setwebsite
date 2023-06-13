"use client";
import { useFormik } from "formik";
import React, { FC, useMemo, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import Api from "@/lib/api";
import Button from "@/components/Button";
import { ArrowRight } from "@/components/icons";
import { formattedMoney } from "@/lib/utils";
import { getConstantValue } from "typescript";

import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  CardElement,
  useElements,
} from "@stripe/react-stripe-js";

const options: any = {
  mode: "payment",
  currency: "usd",
  amount: 2000,
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface PageProps {
  params: { id: string };
}

const SubPayment: FC<PageProps> = ({ params }) => {
  return (
    <Elements stripe={stripePromise} options={options}>
      <VendorPayment id={params.id} />
    </Elements>
  );
};

const VendorPayment = ({ id }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const [subscribe, setSubscribe] = useState<any>({
    profile_sub: true,
    quote_sub: false,
  });

  const subscriptions = useMemo(() => {
    return [
      {
        title: "Profile Visibility Subscription",
        price: 500,
        duration: "Yearly",
        name: "profile_sub",
      },
      {
        title: "Quote Notifications",
        price: 800,
        duration: "Yearly",
        name: "quote_sub",
      },
    ];
  }, []);

  const router = useRouter();

  const handleChange = (e: any) => {
    setSubscribe((prev: any) => {
      return { ...prev, [e.target.name]: e.target.checked };
    });
  };

  const getTotal = () => {
    let total = 0;
    if (subscribe.profile_sub) total += subscriptions[0].price;
    if (subscribe.quote_sub) total += subscriptions[1].price;

    return total;
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (elements == null) {
        setLoading(false);

        return;
      }

      const paymentMethod = await stripe?.createPaymentMethod({
        card: elements?.getElement(CardElement)!,
        type: "card",
      });

      const { error: submitError }: any = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }
      const res = await fetch("/api/vendor/create-intent", {
        method: "POST",
        body: JSON.stringify({
          id,
          ...subscribe,
          paymentMethod: paymentMethod?.paymentMethod?.id,
        }),
        headers: {
          "Content-Type": "application/json;charsetUTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const { client_secret: clientSecret } = await res.json();
      if (!clientSecret) throw new Error("Opps,something went wrong");

      // confirm the payment by the user
      const { error }: any = await stripe?.confirmCardPayment(clientSecret);

      //   const { error }: any = await stripe?.confirmPayment({
      //     elements,
      //     clientSecret,
      //     confirmParams: {
      //       return_url:
      //         process.env.NEXT_PUBLIC_BASE_URL +
      //         `/checkout/backdrop/payment/${id}/complete`,
      //     },
      //   });

      if (error) {
        setLoading(false);
        setErrorMessage(error.message);
      } else {
        NotificationManager.success("Subscription successful!");
        router.push("/");
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error.message);
      NotificationManager.error(error.message);
    }
  };

  return (
    <div className="w-80 m-auto my-4 py-12">
      <div>
        <h2 className="em__fancy__text sm:text-[53px] sm:leading-[54px]">
          {" "}
          Payments
        </h2>
        <p>Kindly select subscription package</p>

        <div>
          <div className="mb-5">
            {subscriptions.map((sub, i) => (
              <div className="relative" key={i}>
                <label
                  htmlFor={sub.name}
                  className={`transition-all block p-5 em__vpcard shadow rounded-[18px] rounded-br-lg bg-white my-3 cursor-pointer ${
                    subscribe[sub.name] && "active"
                  }`}
                >
                  <h4>{sub.title}</h4>
                  <h2 className="text-2xl font-bold text-[#8b5326]">
                    {formattedMoney(sub.price)}
                  </h2>
                </label>
                <input
                  className="absolute accent-[#263f61] h-[18px] w-[18px] rounded-full right-4 bottom-[45px]"
                  id={sub.name}
                  type="checkbox"
                  checked={subscribe[sub.name]}
                  name={sub.name}
                  value={subscribe[sub.name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <CardElement />
            {errorMessage && <div className="em__error">{errorMessage}</div>}

            <div className="flex justify-between items-center">
              <h4>Total</h4>
              <strong>{formattedMoney(getTotal())}</strong>
            </div>
          </div>

          <Button
            text="Subscribe"
            classNames="block w-full"
            RightIcon={<ArrowRight />}
            loading={loading}
            disabled={loading || getTotal() == 0 || !stripe}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SubPayment;
