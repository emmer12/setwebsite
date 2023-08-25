import { NextApiRequest, NextApiResponse } from "next";
import { topUpSchema } from "@/lib/utils/validations";
import { getToken } from "next-auth/jwt";
import constants from "@/lib/utils/constants";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (token) {
    if (req.method === "POST") {
      try {
        const data = JSON.parse(req.body);
        data.amount = Number(data.amount)

        const validate = topUpSchema.safeParse(data);

        if (!validate.success) {
          const { errors } = validate.error;
          return res.status(400).json({
            error: { message: "Invalid request", errors },
          });
        }

        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "SetEvents Point Top up",
                },
                unit_amount: data.amount * 100,
              },
              quantity: 1,
            },
          ],
          metadata: {
            user_id: token.id,
            amount: data.amount,
            payment_type: data.type === 'saf' ? constants.payment_type.SAF_TOP_UP : constants.payment_type.AI_TOP_UP,
          },
          mode: "payment",
          success_url: `${process.env.BASE_URL}/account?status=success`,
          cancel_url: `${process.env.BASE_URL}/account?status=cancel`,
        });

        return res.status(200).json({
          msg: "Payment intent created successfully",
          redirect_url: session.url,
        });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }
  } else {
    return res.status(401).json({ msg: "UnAuthorized" });
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
