import prisma from "@/lib/prisma";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
import path from "path";


export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (
    req: NextApiRequest,
    saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "public/uploads/");
        options.maxFileSize = 10 * 1024 * 1024; // 10mb
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename;
        };
    }
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

const Messages = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });

    if (token) {
        const { fields, files }: any = await readFile(req, true);
        if (req.method === "POST") {

            if (files.attachment) {
                fields.fileUrl = `${process.env.BASE_URL}/api/uploads/${files.attachment.newFilename}`;
            }

            await prisma.message.create({
                data: {
                    receiverId: fields.receiverId,
                    senderId: token.id as string,
                    userId: token.id as string,
                    conversationId: fields.conversationId,
                    text: fields.text,
                    fileUrl: fields.fileUrl || null
                }
            })

            res.status(200).send("Message sent");


        }
        else if (req.method === "GET") {
            const body = req.body
            try {
                const messages = await prisma.message.findMany({
                    where: {
                        conversationId: body.chatId,
                    },
                    include: {
                        User: true,

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