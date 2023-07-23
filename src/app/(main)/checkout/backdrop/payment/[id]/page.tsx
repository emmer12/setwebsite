"use client";
import React, { useState, useEffect, FC } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "@/components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface PageProps {
  params: { id: string };
}

const options: any = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};

const Payment: FC<PageProps> = ({ params }) => {
  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm id={params.id} />
    </Elements>
  );
};

const PaymentForm = ({ id }: any) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const element = elements?.getElement(CardElement)!;
    element?.on("ready", () => {
      setLoaded(true);
    });
  }, [elements]);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError }: any = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }
    const res = await fetch("/api/backdrops/create-intent", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json;charsetUTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });

    const { client_secret: clientSecret } = await res.json();

    const { error }: any = await stripe?.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url:
          process.env.NEXT_PUBLIC_BASE_URL +
          `/checkout/backdrop/payment/${id}/complete`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="my-6">
      <div className="container-x">
        <div className="em__body__wrapper">
          <div className="max-w-full m-auto w-[600px]">
            <form onSubmit={handleSubmit}>
              <div className="body__wrapper">
                <PaymentElement />
                <br />
                {errorMessage && <div className="error">{errorMessage}</div>}
                <br />
                <Button
                  loading={loading}
                  disabled={loading}
                  text="Make Payment"
                />
                {/* Show error message to your customers */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
