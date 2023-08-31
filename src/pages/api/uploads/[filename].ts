import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { getContentType, getFileExtension } from "../../../lib/utils";

export default function file(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;

  const mime = getContentType('.' + getFileExtension(filename as string))
  try {
    const fileBuffer = fs.readFileSync(`public/uploads/${filename}`);
    res.setHeader("Content-Type", mime);
    res.status(200).send(fileBuffer);
  } catch (error) { }
}


