import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import constants from "@/lib/utils/constants";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// prod_O4fy7jjGv1y7Yy;
const sub = {
  profile_sub: {
    price: 500,
    name: "profile_sub",
  },
  quote_sub: {
    price: 800,
    name: "quote_sub",
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id, paymentMethod }: any = JSON.parse(req.body);

    try {
      const vendor = await prisma.vendor.findUnique({
        where: {
          id: id,
        },
        include: {
          user: true,
        },
      });

      if (!vendor) throw Error("Not Found");
      let total = 0;
      let items = [];

      // create a stripe customer
      const customer = await stripe.customers.create({
        name: vendor.user.name,
        email: vendor.user.email,
        payment_method: paymentMethod,
        invoice_settings: {
          default_payment_method: paymentMethod,
        },
      });

      if (vendor.profile_sub) {
        total += constants.vendor_subscriptions.BASIC;
      }
      if (vendor.quote_sub) {
        total += constants.vendor_subscriptions.QUOTE;
      }

      if (vendor.profile_sub) {
        items.push({
          price_data: {
            currency: "USD",
            recurring: {
              interval: "year",
            },
            product: "prod_O4fy7jjGv1y7Yy",
            unit_amount: constants.vendor_subscriptions.BASIC * 100,
          },
        });
      }
      if (vendor.quote_sub) {
        items.push({
          price_data: {
            currency: "USD",
            recurring: {
              interval: "year",
            },
            product: "prod_O4fzeKPqL1SlC1",

            unit_amount: constants.vendor_subscriptions.QUOTE * 100,
          },
        });
      }
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
          vendor_id: vendor.id,
          email: vendor.user.email,
          payment_type: constants.payment_type.VENDOR_SUB,
          sub: JSON.stringify({
            profile_sub: vendor.profile_sub,
            quote_sub: vendor.quote_sub,
          }),
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
