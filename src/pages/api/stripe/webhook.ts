import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { buffer } from "micro";
import constants from "@/lib/utils/constants";
import {
  logBackdropPayment,
  logVendorSubscription,
} from "@/lib/prisma/payments";
// import getRawBody from 'raw-body';
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// async function buffer(readable: any) {
//   const chunks = [];
//   for await (const chunk of readable) {
//     chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
//   }
//   return Buffer.concat(chunks);
// }

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      console.log("Got here");
      // const body: any = req.body;
      const buf = await buffer(req);
      const sig = req.headers["stripe-signature"];
      // This is your Stripe CLI webhook secret for testing your endpoint locally.
      const endpointSecret =
        process.env.NODE_ENV === "production"
          ? process.env.WEBHOOKS_SECRET_MAIN
          : "whsec_2397b1549247108c3c7e0baff25584418be7e31b4ffb36a706704f241273f05e";

      let event;

      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);

      switch (event.type) {
        case "payment_intent.succeeded":
          let paymentIntentSucceeded = event.data.object;

          let { order_id, payment_type } = paymentIntentSucceeded.metadata;
          if (payment_type == constants.payment_type.BACKDROP) {
            await logBackdropPayment(order_id, paymentIntentSucceeded.id);
          }
          // Then define and call a function to handle the event payment_intent.succeeded
          break;

        case "customer.subscription.created":
          {
            let paymentIntentSucceeded2 = event.data.object;

            // http://localhost:3000/vendor/onboard/payment/64887ace050573a2ab08b49b
            let { payment_type, vendor_id, sub } =
              paymentIntentSucceeded2.metadata;
            if (payment_type == constants.payment_type.VENDOR_SUB) {
              await logVendorSubscription(vendor_id, sub);
            }
          }

          break;
        // ... handle other event types

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    } finally {
    }
  } else {
  }
};

export default handler;
