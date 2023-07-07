import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import constants from "@/lib/utils/constants";
import { getSubById } from "@/lib/prisma/subscriptions";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// prod_O4fy7jjGv1y7Yy;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id, paymentMethod }: any = JSON.parse(req.body);

    try {
      const { sub } = await getSubById(id);

      if (!sub) throw Error("Not Found");
      let items = [];

      // create a stripe customer
      const customer = await stripe.customers.create({
        name: sub.user.name,
        email: sub.user.email,
        payment_method: paymentMethod,
        invoice_settings: {
          default_payment_method: paymentMethod,
        },
      });

      items.push({
        price_data: {
          currency: "USD",
          recurring: {
            interval: "year",
          },
          product: "prod_O4fy7jjGv1y7Yy",
          unit_amount: sub.price * 100,
        },
      });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items,
        payment_settings: {
          // payment_method_options: ["card"],
          save_default_payment_method: "on_subscription",
        },
        expand: ["latest_invoice.payment_intent"],
        currency: "usd",
        metadata: {
          sub_id: sub.id,
          email: sub.user.email,
          payment_type: constants.payment_type.SAF_SUB,
        },
      });
      res.status(200).json({
        success: true,
        client_secret: subscription.latest_invoice.payment_intent.client_secret,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    } finally {
    }
  } else {
  }
};

export default handler;
