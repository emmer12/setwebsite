import { NextApiRequest, NextApiResponse } from "next";
import {
  createNotifications,
  getNotifications,
} from "@/lib/prisma/notifications";
import { getToken } from "next-auth/jwt";
import { sendQuoteRequestEmail, sendTestEmail } from "@/lib/mailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (req.method === "GET") {
    try {
      sendTestEmail();
      // const { notifications, error }: any = await getNotifications();
      return res.status(200).json({});
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  //  return;
  //  const data = {
  //    title: "Quote Request Notification",
  //    message: "You have a new quote Notification",
  //    userId: "64ba12da75caae0902fba835",
  //  };

  //  const { notification, error }: any = await createNotifications(data);
  //  if (error) throw new Error(error);

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
