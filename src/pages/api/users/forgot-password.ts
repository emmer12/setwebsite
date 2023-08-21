import { NextApiRequest, NextApiResponse } from "next";
import { sendResetPasswordEmail } from "@/lib/mailer";
import prisma from "@/lib/prisma";
import { createPasswordResetToken } from "@/lib/prisma/users";
import { generateToken } from "@/lib/utils";
import { passwordResetRequestSchema } from "@/lib/utils/validations";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const data = JSON.parse(req.body);
      const validate = passwordResetRequestSchema.safeParse(data);

      if (!validate.success) {
        const { errors } = validate.error;
        return res.status(400).json({
          error: { message: "Invalid request", errors },
        });
      }

      const user = await prisma.user.findFirst({
        where: { email: data.email },
      });

      if (!user) {
        return res
          .status(404)
          .json({ msg: `User with ${data.email} not Found` });
      }

      const token = generateToken();

      await createPasswordResetToken(user.id, token);
      sendResetPasswordEmail(user, token);

      return res.status(200).json({
        msg: `An email containing instructions on how to reset your password has been sent to ${data.email}`,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
