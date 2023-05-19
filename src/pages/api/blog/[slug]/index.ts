import { NextApiRequest, NextApiResponse } from "next";
import { getUserById } from "@/lib/prisma/users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { userId }: any = req.query;
      const { user, error }: any = await getUserById(userId);
      if (error) throw new Error(error);
      return res.status(200).json({ user });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
