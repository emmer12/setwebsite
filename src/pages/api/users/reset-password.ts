import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { passwordResetSchema } from "@/lib/utils/validations";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = JSON.parse(req.body);

      const validate = passwordResetSchema.safeParse(data);

      if (!validate.success) {
        const { errors } = validate.error;
        return res.status(400).json({
          error: { message: "Invalid request", errors },
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: data.id },
      });

      if (!user) {
        return res.status(404).json({ msg: `User not Found` });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.password, salt);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hash,
        },
      });

      await prisma.passwordResetToken.delete({
        where: {
          token: data.token,
        },
      });

      return res.status(200).json({ msg: "Password Updated" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
