import { NextApiRequest, NextApiResponse } from "next";
import { getSubById } from "@/lib/prisma/subscriptions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id }: any = req.query;
      const { sub, error }: any = await getSubById(id);

      if (error) throw new Error(error);
      return res.status(200).json({ sub });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
