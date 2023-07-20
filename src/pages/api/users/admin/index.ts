import { NextApiRequest, NextApiResponse } from "next";
import { getAllUsers } from "@/lib/prisma/users";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  //   if (token && token.role == 'Admin') {
  // && token.role == "Admin"
  if (token) {
    if (req.method === "GET") {
      try {
        const { users, nextPage, prevPage, totalPages, error }: any =
          await getAllUsers(1, 20);
        if (error) throw new Error(error);
        return res.status(200).json({ users, nextPage, prevPage, totalPages });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }
  } else {
    return res.status(401).json({ msg: "UnAuthorized" });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
