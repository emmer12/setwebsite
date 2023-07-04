import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { createVendor, getVendors } from "@/lib/prisma/vendors";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

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
    options.uploadDir = path.join(process.cwd(), "public/uploads/images");
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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getServerSession(req, res, authOptions);
  const token = await getToken({ req });

  if (token) {
    if (req.method === "POST") {
      try {
        await fs.readdir(
          path.join(process.cwd() + "/public/uploads", "/images")
        );
      } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/uploads"));
        await fs.mkdir(path.join(process.cwd() + "/public/uploads", "/images"));
      }

      try {
        const { fields, files }: any = await readFile(req, true);
        let data = { ...fields, userId: token.id };
        const hasAccount = await prisma.vendor.findFirst({
          where: { userId: token.id as string },
        });

        if (hasAccount) throw new Error("Already has an account");

        if (files.image_1) {
          data.image_1_path = `/uploads/images/${files.image_1.newFilename}`;
        }
        if (files.image_2) {
          data.image_2_path = `/uploads/images/${files.image_2.newFilename}`;
        }
        if (files.video) {
          data.video_1_path = `/uploads/videos/${files.video.newFilename}`;
        }

        const record = await createVendor(data);
        if (record.error) {
          console.log(record.error);
          res.status(500).json({ msg: "Opps, Something went wrong" });
        } else {
          res.status(201).json({ record: record.vendor });
        }
      } catch (error: any) {
        res.status(500).json({ error, msg: error.message });
      } finally {
        await prisma.$disconnect();
      }
    } else {
      res.status(425).end(`Method ${req.method} is not allowed.`);
      res.setHeader("Allow", ["GET"]);
    }
  } else {
    res.status(401).end(`UnAuthorized`);
  }
};

export default handler;
