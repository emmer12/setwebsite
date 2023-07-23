import { NextApiRequest, NextApiResponse } from "next";
import { getCategories } from "@/lib/prisma/backdrops";
import { getToken } from "next-auth/jwt";
import constants from "@/lib/utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (token && token.role == constants.roles.ADMIN) {
    if (req.method === "GET") {
      try {
        const { categories, error }: any = await getCategories();
        if (error) throw new Error(error);
        return res.status(200).json({ categories });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }
  } else {
    return res.status(401).json({ msg: "UnAuthorized" });
  }

  res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
