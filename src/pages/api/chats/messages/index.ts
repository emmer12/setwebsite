import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const Messages = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });

    const body = JSON.parse(req.body);

    if (token) {
        if (req.method === "POST") {
            console.log(body, "THIs is the body")
            await prisma.message.create({
                data: {
                    receiverId: body.receiverId,
                    senderId: token.id as string,
                    userId: token.id as string,
                    conversationId: body.conversationId,
                    text: body.text
                }
            })

            res.status(200).send("Message sent");


        }
        else if (req.method === "GET") {
            try {
                const messages = await prisma.message.findMany({
                    where: {
                        conversationId: body.chatId
                    },
                    include: {
                        User: true
                    }
                });
                res.status(200).json(messages);
            } catch (error) {
                res.status(500).send(error);
            }
        }
        else {
            res.status(405).send("Method not allowed");
        }
    } else {
        return res.status(401).json({ msg: "UnAuthorized" });
    }
};

export default Messages;