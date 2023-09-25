import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { passwordUpdateSchema } from "@/lib/utils/validations";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (req.method === "PATCH") {
    if (token) {
      try {
        const data = JSON.parse(req.body);

        const validate = passwordUpdateSchema.safeParse(data);

        if (!validate.success) {
          const { errors } = validate.error;
          return res.status(400).json({
            error: { message: "Invalid request", errors },
          });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);

        await prisma.user.update({
          where: { id: token.id as string },
          data: {
            password: hash,
          },
        });


        return res.status(200).json({ msg: "Password Updated" });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      res.status(401).end(`UnAuthorized`);
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
