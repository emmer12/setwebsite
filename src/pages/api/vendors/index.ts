import { NextApiRequest, NextApiResponse } from "next";
import { getVendors } from "@/lib/prisma/vendors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id }: any = req.query;
      const { vendors, nextPage, prevPage, totalPages, error }: any =
        await getVendors(1, 10);

      if (error) throw new Error(error);
      return res.status(200).json({ vendors, nextPage, prevPage, totalPages });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
