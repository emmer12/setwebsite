import { NextApiRequest, NextApiResponse } from "next";

import {
    sendContactMail
} from "@/lib/mailer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        try {
            const data = JSON.parse(req.body);
            sendContactMail(data);
            return res.status(200).json({ msg: "Sent" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
