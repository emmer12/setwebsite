import { NextApiRequest, NextApiResponse } from "next";
import { getRequestQuote } from "@/lib/prisma/vendors";
import constants from "@/lib/utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id }: any = req.query;
      const { quote, error }: any = await getRequestQuote(id);

      if (error) throw new Error(error);
      return res.status(200).json({ quote });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
