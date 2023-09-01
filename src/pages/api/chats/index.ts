import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const Messages = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });

    const { body, method } = req;

    if (token) {
        if (method === "POST") {
            const conversation = await prisma.conversation.findFirst({

            });

            if (conversation) {
                try {
                    const message = await prisma.message.create({
                        data: {
                            text: body.text,
                            fileUrl: body.fileUrl,
                            senderId: body.senderId,
                            receiverId: body.receiverId,
                            conversationId: conversation.id,
                        },
                    });
                    res
                        .status(200)
                        .json({ message: "Message created successfully", content: message });
                } catch (error) {
                    res.status(500).send(error);
                }
            } else {
                const newConversation = await prisma.conversation.create({
                    data: {
                        senderId: body.senderId,
                        receiverId: body.receiverId,
                    },
                });

                try {
                    const message = await prisma.message.create({
                        data: {
                            text: body.text,
                            fileUrl: body.image,
                            conversationId: newConversation.id,
                            senderId: body.senderId,
                            receiverId: body.receiverId,
                        },
                    });

                    return res.status(200).json(message);
                } catch (error) {
                    return res.status(500).send(error);
                }
            }
        }
        else if (method === "GET") {
            try {
                const conversation = await prisma.conversation.findMany({
                    orderBy: {
                        createdAt: "desc",
                    },
                    where: {
                        OR: [
                            { receiverId: token.id as string },
                            { senderId: token.id as string }
                        ]
                    },
                    include: {
                        messages: {
                            include: {
                                sender: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                                receiver: {
                                    select: {
                                        id: true,
                                        name: true
                                    },
                                }
                            }
                        },
                        Receiver: true,
                        User: true
                    }
                });
                res.status(200).json(conversation);
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