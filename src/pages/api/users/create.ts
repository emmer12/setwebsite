import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
      const hash = bcrypt.hashSync(userData.password, salt);

      const newUser = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hash,
        },
      });

      res.status(201).json({ user: newUser });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    } finally {
      await prisma.$disconnect();
    }
  }
  else if (req.method === "PATCH") {
    const userData = JSON.parse(req.body);
    const token = await getToken({ req });

    if (token) {
      try {
        const updatedUser = await prisma.user.update({
          where: {
            id: token.id as string
          },
          data: {
            name: userData.name,
          },
        });

        res.status(201).json({ user: updatedUser });
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      res.status(401).end(`UnAuthorized`);
    }



  }
  else {
    res.status(425).end(`Method ${req.method} is not allowed.`);
    res.setHeader("Allow", ["GET"]);
  }

  console.log("Got here");
};

export default handler;
