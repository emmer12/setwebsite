import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getRequestQuotes } from "@/lib/prisma/users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    if (token) {
        if (req.method === "GET") {
            try {
                const { id }: any = req.query;
                const { quotes, nextPage, prevPage, totalPages, error }: any = await getRequestQuotes(id, token.id, 1, 20);

                if (error) throw new Error(error);
                return res.status(200).json({ quotes, nextPage, prevPage, totalPages });
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
