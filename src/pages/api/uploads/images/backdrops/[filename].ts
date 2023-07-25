import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default function images(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;

  try {
    const imageBuffer = fs.readFileSync(
      `public/uploads/images/backdrops/${filename}`
    );
    res.setHeader("Content-Type", "image/jpg");
    res.status(200).send(imageBuffer);
  } catch (error) {}
}
