import { NextApiRequest, NextApiResponse } from "next";
import { createRequest, getRequests } from "@/lib/prisma/users";
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
import fs from "fs/promises";
import fss from "fs";
import path from "path";
import { generateSlug, getFileExtension } from "@/lib/utils";
import { vendorRequestSchema } from "@/lib/utils/validations";
import prisma from "@/lib/prisma";

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
        const { requests, nextPage, prevPage, totalPages, error }: any =
          await getRequests(1, 20, token.id);
        if (error) throw new Error(error);
        return res
          .status(200)
          .json({ requests, nextPage, prevPage, totalPages });
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

      const validate = vendorRequestSchema.safeParse(data);

      if (!validate.success) {
        const { errors } = validate.error;
        return res.status(400).json({
          error: { message: "Invalid request", errors },
        });
      }

      const vendor = await prisma.vendor.findUnique({
        where: { id: data.vendor_id },
      });

      if (!vendor) {
        return res.status(400).json({
          error: { message: "Vendor not Found" },
        });
      }

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

        //added 3 days to currentDate
        const deadline = new Date(currentDate.getTime() + 72 * 60 * 60 * 1000);

        const { record, error }: any = await createRequest({
          title: data.title,
          deadline: deadline,
          categoryId: vendor.vendorCategoryId,
          subCategoryId: vendor.vendorSubCategoryId,
          services: vendor.services,
          docUrl: data.docUrl,
          userId: token.id,
          additional_request: data.additional_request,
          imageUrl: data.imageUrl,
          occasion: data.occasion
        });

        // TODO Notify vendor

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
