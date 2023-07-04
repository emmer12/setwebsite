import { NextApiRequest, NextApiResponse } from "next";
import { getVendorById } from "@/lib/prisma/vendors";
import constants from "@/lib/utils/constants";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { id }: any = req.query;
      const { vendor, error }: any = await getVendorById(id);

      let total = 0;
      if (vendor.profile_sub) {
        total += constants.vendor_subscriptions.BASIC;
      }
      if (vendor.quote_sub) {
        total += constants.vendor_subscriptions.QUOTE;
      }

      if (error) throw new Error(error);
      return res.status(200).json({ vendor, total });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
