import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);

    try {
      const tokenRecord = await prisma.passwordResetToken.findUnique({
        where: {
          token: body.token,
        },
      });

      if (!tokenRecord) {
        return res.status(404).json({ msg: "Token not found" });
      }

      const currentTime = new Date();
      const tokenExpirationTime = tokenRecord.expiresAt;

      if (currentTime > tokenExpirationTime) {
        return res.status(404).json({ msg: "Token has expired" });
      }

      return res
        .status(200)
        .json({ msg: "Valid Token", id: tokenRecord.userId });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Error validating token" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
