import { NextApiRequest, NextApiResponse } from "next";
import { getNotifications, markNotification } from "@/lib/prisma/notifications";
import { getToken } from "next-auth/jwt";
import { sendQuoteRequestEmail, sendTestEmail } from "@/lib/mailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  if (token) {
    if (req.method === "GET") {
      try {
        const { notifications, error }: any = await getNotifications(
          token.id as string
        );
        return res.status(200).json({ notifications });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }
    if (req.method === "PATCH") {
      try {
        const { success, error } = await markNotification(token.id as string);
        if (error) throw Error("Opp, Something went wrong");
        return res.status(200).json({ msg: "Updated" });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }
  } else {
    return res.status(401).json({ msg: "UnAuthorized" });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
