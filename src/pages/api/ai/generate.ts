import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getUserById } from "@/lib/prisma/users";
import { generate } from "@/lib/prisma/ai";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });
    if (req.method === "POST") {
        let data = JSON.parse(req.body);

        if (token) {
            try {
                const { user } = await getUserById(token.id as string);
                const record: any = await generate(data, user);
                if (record.error) {
                    return res.status(400).json({ msg: record.error.message });
                } else {
                    console.log(record)
                    return res.status(201).json({ id: record.id });
                }
            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        } else {
            res.status(401).json({ msg: "UnAuthorized" });
        }
    }

    if (req.method === "GET") {
        const query = req.query;
        if (token) {
            try {
                const response: any = await fetch(`${process.env.AI_BASE_URL}/image/get`, {
                    method: "POST",
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({ id: query.id })
                });
                const images = await response.json();
                return res
                    .status(200)
                    .json({ images });

            } catch (error: any) {
                return res.status(500).json({ error: error.message });
            }
        } else {
            res.status(401).json({ msg: "UnAuthorized" });
        }
    }

    res.status(425).end(`Method ${req.method} is not allowed.`);
    res.setHeader("Allow", ["GET"]);
};

export default handler;
