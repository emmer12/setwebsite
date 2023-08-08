import { getCategories } from "@/lib/prisma/vendors";
import { dropdownCat, dropdownSub } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { categories, error }: any = await getCategories();
      if (error) throw new Error(error);
      return res
        .status(200)
        .json({
          categories: dropdownCat(categories),
          subCategories: dropdownSub(categories),
        });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
