import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { createUser } from "@/lib/prisma/saf";
import constants from "@/lib/utils/constants";
import { getUserById } from "@/lib/prisma/users";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });

  if (req.method === "POST") {
    let data = JSON.parse(req.body);

    if (token) {
      try {
        const { user } = await getUserById(token.id as string);
        const record: any = await createUser(data, user);
        if (record.error) {
          return res.status(400).json({ msg: record.error.message });
        } else {
          return res.status(201).json({ record: record });
        }
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      res.status(401).json({ msg: "UnAuthorized" });
    }
  }

  res.status(425).end(`Method ${req.method} is not allowed.`);
  res.setHeader("Allow", ["GET"]);
};

export default handler;
