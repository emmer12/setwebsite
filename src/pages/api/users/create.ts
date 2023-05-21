import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method);
  if (req.method === "POST") {
    try {
      const userData = JSON.parse(req.body);

      const user = await prisma.user.findFirst({
        where: { email: userData.email },
      });

      if (user) {
        return res.status(400).json({ msg: `User with this email exist` });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(myPlaintextPassword, salt);

      const newUser = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hash,
        },
      });

      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(500).json({ error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(425).end(`Method ${req.method} is not allowed.`);
    res.setHeader("Allow", ["GET"]);
  }

  console.log("Got here");
};

export default handler;
