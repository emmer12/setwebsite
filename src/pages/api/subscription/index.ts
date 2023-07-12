import { NextApiRequest, NextApiResponse } from "next";
import { getSubscriptions } from "@/lib/prisma/subscriptions";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  if (req.method === "GET") {
    if (token) {
      try {
        const { subscriptions, error }: any = await getSubscriptions(token.id);
        if (error) throw new Error(error);
        return res.status(200).json({ subscriptions });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      res.status(401).json({ msg: "UnAuthorized" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
