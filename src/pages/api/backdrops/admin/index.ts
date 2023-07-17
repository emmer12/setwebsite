import { NextApiRequest, NextApiResponse } from "next";
import { createBackdrops, getAllBackdrops } from "@/lib/prisma/backdrops";
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import fss from "fs";
import { generateSlug } from "@/lib/utils";

function getFileExtension(filename: string) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

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
    options.uploadDir = path.join(
      process.cwd(),
      "public/uploads/images/backdrops"
    );
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      const file: any = files.file;

      const allowedExtensions = ["pdf"];
      const fileExtension = getFileExtension(file.originalFilename);

      console.log(fileExtension);

      if (!allowedExtensions.includes(fileExtension))
        reject("File must be pdf");
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  //   if (token && token.role == 'Admin') {
  // && token.role == "Admin"
  if (token) {
    if (req.method === "GET") {
      try {
        const { backdrops, nextPage, prevPage, totalPages, error }: any =
          await getAllBackdrops(1, 20);
        if (error) throw new Error(error);
        return res.status(200).json({ backdrops });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }

    if (req.method === "POST") {
      try {
        await fs.readdir(
          path.join(process.cwd() + "/public/uploads/images", "/backdrops")
        );
      } catch (error) {
        await fs.mkdir(
          path.join(process.cwd() + "/public/uploads/images", "/backdrops")
        );
      }
      const { fields, files }: any = await readFile(req, true);
      let data = { ...fields };
      try {
        if (files.file) {
          const oldPath = `${path.join(
            `public/uploads/images/backdrops/${files.file.newFilename}`
          )}`;
          const newPath = `${path.join(
            `src/assets/backdrops/${files.file.newFilename}`
          )}`;
          fss.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            console.log("Successfully renamed - AKA moved!");
          });
        }
        console.log("Got here");
        if (files.preview) {
          data.imageUrl = `/uploads/images/backdrops/${files.preview.newFilename}`;
        }
        if (files.file) {
          data.filePath = `backdrops/${files.file.newFilename}`;
        }

        data.categoryId = "64664d24d36d7a9862be3daa";
        data.addOn = ["Cake", "Acrylics", "Invitation", "Flowers"];
        data.slug = generateSlug(data.title);
        data.price = parseInt(data.price);

        const { backdrop, error }: any = await createBackdrops(data);
        if (error) throw new Error(error);
        return res.status(200).json({ backdrop });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }

    if (req.method === "PATCH") {
      //   try {
      //     const { backdrops, error }: any = await getAllBackdrops();
      //     if (error) throw new Error(error);
      //     return res.status(200).json({ backdrops });
      //   } catch (error: any) {
      //     return res.status(500).json({ error: error.message });
      //   }
    }

    if (req.method === "DELETE") {
      //   try {
      //     const { backdrops, error }: any = await getAllBackdrops();
      //     if (error) throw new Error(error);
      //     return res.status(200).json({ backdrops });
      //   } catch (error: any) {
      //     return res.status(500).json({ error: error.message });
      //   }
    }
  } else {
    return res.status(401).json({ msg: "UnAuthorized" });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
