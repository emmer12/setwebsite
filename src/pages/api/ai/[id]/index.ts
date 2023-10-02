import { remove } from "@/lib/prisma/ai";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        externalResolver: true
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "DELETE") {
        try {
            const { id }: any = req.query;
            const { record, error }: any = await remove(
                id
            );
            if (error) throw new Error(error);
            return res.status(200).json({ msg: 'Item Deleted' });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
