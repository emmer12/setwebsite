import { NextApiRequest, NextApiResponse } from "next";
import { createQuote, getQuotes } from "@/lib/prisma/vendors";
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
import fs from "fs/promises";
import fss from "fs";
import path from "path";
import { generateSlug, getFileExtension } from "@/lib/utils";
import { request } from "http";
import prisma from "@/lib/prisma";
import { sendQuoteNotification } from "@/lib/mailer";
import { createNotifications } from "@/lib/prisma/notifications";

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
    options.uploadDir = path.join(process.cwd(), "public/uploads/docs");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      const file: any = files.doc;

      const allowedExtensions = [
        "pdf",
        "img",
        "png",
        "jpg",
        "jpeg",
        "ppt",
        "doc",
        "docx",
        "pptx",
      ];
      const fileExtension = getFileExtension(file.originalFilename);

      if (!allowedExtensions.includes(fileExtension))
        reject("File must be pdf");
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (token) {
    if (req.method === "GET") {
      try {
        const { quotes, nextPage, prevPage, totalPages, error }: any =
          await getQuotes(1, 20, token.id);
        if (error) throw new Error(error);
        return res.status(200).json({ quotes, nextPage, prevPage, totalPages });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }

    if (req.method === "POST") {
      try {
        await fs.readdir(path.join(process.cwd() + "/public/uploads", "/docs"));
      } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public/uploads", "/docs"));
      }

      const { fields, files }: any = await readFile(req, true);
      let data = { ...fields };

      try {
        if (files.doc) {
          const oldPath = `${path.join(
            `public/uploads/docs/${files.doc.newFilename}`
          )}`;
          const newPath = `${path.join(
            `src/assets/docs/${files.doc.newFilename}`
          )}`;
          fss.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            console.log("Successfully renamed - AKA moved!");
          });
        }

        if (files.doc) {
          data.docUrl = `docs/${files.doc.newFilename}`;
        }
        const currentDate = new Date();
        const request: any = await prisma.requests.findUnique({
          where: {
            id: data.requestId,
          },
          include: {
            user: true,
          },
        });

        const vendor: any = await prisma.vendor.findFirst({
          where: {
            userId: token.id as any,
          },
        });

        if (!request || currentDate > request.deadline) {
          return res.status(400).json({ msg: "Request not found or Expired" });
        }
        const { record, error }: any = await createQuote({
          description: data.description,
          amount: data.amount,
          userId: token.id,
          requestId: request.id,
          attachmentUrl: data.docUrl,
        });

        const newData = {
          rid:request.id,
          quote: record,
          username: request.user.name,
          email: request.user.email,
          company_name: vendor.company_name,
        };

        // Send Quote Notification
        sendQuoteNotification(newData);

        const newNotify = {
          title: "Quote Notification",
          message: `${vendor.company_name} sent a quote`,
          userId: request.user.id,
        };

        await createNotifications(newNotify);

        if (error) throw new Error(error);
        return res.status(200).json({ record });
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
