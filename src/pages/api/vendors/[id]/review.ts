import { NextApiRequest, NextApiResponse } from "next";
import { storeReview } from "@/lib/prisma/vendors";
import constants from "@/lib/utils/constants";
import { ratingSchema } from "@/lib/utils/validations";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const token = await getToken({ req });
        try {
            const { id }: any = req.query;
            const data = JSON.parse(req.body);
            if (token) {
                data.userId = token.id
            }

            const validate = ratingSchema.safeParse(data);

            if (!validate.success) {
                const { errors } = validate.error;
                return res.status(400).json({
                    error: { message: "Invalid request", errors },
                });
            }

            const { record, error }: any = await storeReview(id, data);

            if (error) {
                return res.status(400).json({ msg: error.message });
            }

            res.status(201).json({ record });

        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
