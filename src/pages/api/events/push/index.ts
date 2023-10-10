import { NextApiRequest, NextApiResponse } from "next";
import {
} from "@/lib/prisma/notifications";
import { getToken } from "next-auth/jwt";
import {
    sendSetEmail,
} from "@/lib/mailer";
import { safPushSchema } from "@/lib/utils/validations";
import { format } from "date-fns";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const userData: any = req.body;
        const validate = safPushSchema.safeParse(userData);

        if (!validate.success) {
            const { errors } = validate.error;
            return res.status(400).json({
                error: { message: "Invalid request", errors },
            });
        }

        const user = await prisma?.user.findUnique({
            where: {
                id: userData.user
            }
        })

        if (!user) {
            return res.status(400).json({
                error: { message: "User Not found" },
            });
        }

        const data = {
            category: userData.category,
            email: user.email,
            name: user.name,
            date: format(new Date(+userData.date), 'yyyy-MM-dd HH:mm:ss'),
        }

        try {
            sendSetEmail(data);
            return res.status(200).json({ msg: "Push Received" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
