import { NextApiRequest, NextApiResponse } from "next";
import { getVendor, getVendorById } from "@/lib/prisma/vendors";
import constants from "@/lib/utils/constants";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const token = await getToken({ req });

    if (token) {
      try {
        const { vendor, error }: any = await getVendor(token.id);
        if (error) throw new Error(error);
        return res.status(200).json({ vendor });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      res.status(401).end(`UnAuthorized`);
    }
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(425).end(`Method ${req.method} is not allowed.`);
  }
};

export default handler;
