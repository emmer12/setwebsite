import { NextApiRequest, NextApiResponse } from "next";
import { getBackdrops } from "@/lib/prisma/backdrops";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const query = req.query;
    try {
      const { backdrops, nextPage, prevPage, totalPages, error }: any =
        await getBackdrops(1, 40, query);
      if (error) throw new Error(error);
      return res
        .status(200)
        .json({ backdrops, nextPage, prevPage, totalPages });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
