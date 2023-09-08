import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { createVendor, storeImage } from "@/lib/prisma/vendors";
import { getToken } from "next-auth/jwt";
import { vendorSchema } from "@/lib/utils/validations";
import constants from "@/lib/utils/constants";
import { sendAdminNotification } from "@/lib/mailer";

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getServerSession(req, res, authOptions);
  const token = await getToken({ req });
  let user;

  if (token) {
    if (req.method === "POST") {
      try {
        await fs.readdir(path.join(process.cwd() + "/public/uploads", "/temp"));
      } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public/uploads", "/temp"));
      }

      try {
        const { fields, files }: any = await readFile(req, true);
        let data = { ...fields };
        let copyData = { ...data };

        if (!files.image_1) {
          return res.status(400).json({
            error: { message: "At least one image is required" },
          });
        }

        copyData.coverage_cities = JSON.parse(data.coverage_cities);
        copyData.services = JSON.parse(data.services);

        const validate = vendorSchema.safeParse(copyData);

        if (!validate.success) {
          const { errors } = validate.error;
          return res.status(400).json({
            error: { message: "Invalid request", errors },
          });
        }

        user = token;
        data.userId = token.id;
        const hasAccount = await prisma.vendor.findFirst({
          where: { userId: user.id as string },
        });

        if (hasAccount) throw Error('You already have a vendor account')

        const record = await createVendor({
          userId: data.userId,
          company_name: data.company_name,
          company_overview: data.company_overview,
          website: data.website,
          services: JSON.parse(data.services),
          company_email: data.company_email,
          company_location: data.company_location,
          socials: data.socials,
          country: data.country,
          city: data.city,
          license_number: data.license_number,
          coverage_cities: data.coverage_cities,
          whatsapp_number: data.whatsapp_number,
          office_number: data.office_number,
          instagram: data.instagram,
          vendorCategoryId: data.vendorCategoryId,
          vendorSubCategoryId: data.vendorSubCategoryId,
          legal_disclaimer: constants.legal.VENDOR_REG,
        });

        if (record.error) {
          console.log(record.error);
          res.status(500).json({ msg: "Opps, Something went wrong" });
        } else {

          if (files.image_1) {
            let path = `/api/uploads/images/${files.image_1.newFilename}`;
            await storeImage(path, files.image_1.newFilename, record?.vendor?.id)
          }
          if (files.image_2) {
            let path = `/api/uploads/images/${files.image_2.newFilename}`;
            await storeImage(path, files.image_1.newFilename, record?.vendor?.id)

          }
          if (files.image_3) {
            let path = `/api/uploads/images/${files.image_3.newFilename}`;
            await storeImage(path, files.image_1.newFilename, record?.vendor?.id)
          }



          // TODO Notify  Admin

          sendAdminNotification();

          res.status(201).json({ record: record.vendor });
        }
      } catch (error: any) {
        console.log(error);
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
