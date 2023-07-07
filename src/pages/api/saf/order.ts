import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { processUserRegistration } from "@/lib/prisma/users";
import { createSubscription } from "@/lib/prisma/subscriptions";
import constants from "@/lib/utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getServerSession(req, res, authOptions);
  const token = await getToken({ req });
  let user;

  if (req.method === "POST") {
    try {
      let data = JSON.parse(req.body);

      if (token) {
        user = token;
        data.userId = token.id;
      } else {
        const userData = {
          email: data.email,
          name: data.full_name,
          password: data.password,
        };
        user = await processUserRegistration(userData, res);
        data.userId = user.id;
      }
      let price, service, description;

      const sub = JSON.parse(data.sub);

      if (sub.set_and_forget_sub) {
        price = constants.saf_subscriptions.BASIC;
        service = constants.subscription_type.SAF_BASIC;
        description = "Set and forget Basic Subscription";
      } else if (sub.set_and_forget_sub_upgrade) {
        price = constants.saf_subscriptions.PRO;
        service = constants.subscription_type.SAF_PRO;
        description = "Set and forget pro Subscription";
      }

      const record = await createSubscription({
        service,
        price,
        description,
        userId: data.userId,
      });

      if (record.error) {
        console.log(record.error);
        res.status(500).json({ msg: "Opps, Something went wrong" });
      } else {
        res.status(201).json({ record: record.sub });
      }
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error, msg: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(425).end(`Method ${req.method} is not allowed.`);
    res.setHeader("Allow", ["GET"]);
  }
};

export default handler;
