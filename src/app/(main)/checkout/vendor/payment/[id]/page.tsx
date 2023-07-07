"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import Button from "@/components/Button";
import { ArrowRight } from "@/components/icons";
import { formattedMoney } from "@/lib/utils";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  CardElement,
  useElements,
} from "@stripe/react-stripe-js";
import { getVendorById } from "@/lib/api/vendor.api";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface PageProps {
  params: { id: string };
}

const SubPayment: FC<PageProps> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<any>(null);
  const [total, setTotal] = useState<any>(0);

  useEffect(() => {
    getVendor();
  }, []);

  const getVendor = async () => {
    try {
      setLoading(true);
      const data = await getVendorById(params.id);
      setOrder(data.vendor);
      setTotal(data.total);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const options: any = {
    mode: "payment",
    currency: "usd",
    amount: total,
  };

  if (loading) {
    return (
      <div className="h-[200px] m-auto text-center flex items-center justify-center">
        loading...
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <VendorPayment total={total} order={order} id={params.id} />
    </Elements>
  );
};

const VendorPayment = ({ id, total, order }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const router = useRouter();

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
      const res = await fetch("/api/vendors/create-intent", {
        method: "POST",
        body: JSON.stringify({
          id,
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

      if (error) {
        setLoading(false);
        setErrorMessage(error.message);
      } else {
        NotificationManager.success("Subscription successful!");
        router.push("/vendor/dashboard/profile");
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error.message);
      NotificationManager.error(error.message);
    }
  };

  useEffect(() => {
    const element = elements?.getElement(CardElement)!;
    element?.on("ready", () => {
      setLoaded(true);
    });
  }, [elements]);

  return (
    <div className="w-80 m-auto my-4 py-12">
      <div>
        <h2 className="em__fancy__text sm:text-[53px] sm:leading-[54px]">
          {" "}
          Payments
        </h2>

        <div>
          {order?.profile_sub && (
            <div className="relative">
              <label
                className={`active transition-all block p-3 em__vpcard shadow rounded-[18px] rounded-br-lg bg-white my-3 `}
              >
                <h4>Vendor Yearly</h4>
                <h2 className="text-2xl font-bold text-[#986a47]">
                  {formattedMoney(100)}
                </h2>
              </label>
            </div>
          )}

          {order?.quote_sub && (
            <div className="relative">
              <label
                className={`active transition-all block p-3 em__vpcard shadow rounded-[18px] rounded-br-lg bg-white my-3 `}
              >
                <h4>Quote Yearly Subscription </h4>
                <h2 className="text-2xl font-bold text-[#986a47]">
                  {formattedMoney(190)}
                </h2>
              </label>
            </div>
          )}
          <div className="mb-5">
            <CardElement />
            {errorMessage && <div className="em__error">{errorMessage}</div>}

            <div className="flex justify-between items-center">
              <h4>Total</h4>
              <strong>{formattedMoney(total)}</strong>
            </div>
          </div>

          <Button
            text="Subscribe"
            classNames="block w-full"
            RightIcon={<ArrowRight />}
            loading={loading}
            disabled={loading || total == 0 || !loaded}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SubPayment;
