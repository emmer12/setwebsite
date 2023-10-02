import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getUserById } from "@/lib/prisma/users";
import { getAll } from "@/lib/prisma/ai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    if (req.method === "GET") {
        if (token) {
            try {
                const record: any = await getAll(token.id as string);
                if (record.error) {
                    return res.status(400).json({ msg: record.error.message });
                } else {
                    return res.status(201).json({ images: record.images });
                }
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        } else {
            return res.status(401).json({ msg: "UnAuthorized" });
        }
    }

    res.status(425).end(`Method ${req.method} is not allowed.`);
    res.setHeader("Allow", ["GET"]);
};

export default handler;
