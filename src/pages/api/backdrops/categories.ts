import { NextApiRequest, NextApiResponse } from "next";
import { getBackdrop, getCategories } from "@/lib/prisma/backdrops";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { categories, error }: any = await getCategories();
      if (error) throw new Error(error);
      return res.status(200).json({ categories });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
