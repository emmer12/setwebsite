import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import constants from "@/lib/utils/constants";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id }: any = JSON.parse(req.body);

    try {
      const order = await prisma.backdropOrder.findUnique({
        where: {
          id: id,
        },
      });

      if (!order) throw Error("Not Found");
      const total = order?.totalPrice;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
          order_id: order.id,
          email: order.email,
          payment_type: constants.payment_type.BACKDROP,
        },
      });
      res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
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
