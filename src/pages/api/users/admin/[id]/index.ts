import { NextApiRequest, NextApiResponse } from "next";
import { deleteUser } from "@/lib/prisma/users";
import { getToken } from "next-auth/jwt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  //   if (token && token.role == 'Admin') {
  // && token.role == "Admin"
  if (token) {
    if (req.method === "GET") {
      //   try {
      //     const { backdrops, nextPage, prevPage, totalPages, error }: any =
      //       await getAllBackdrops(1, 20);
      //     if (error) throw new Error(error);
      //     return res.status(200).json({ backdrops });
      //   } catch (error: any) {
      //     return res.status(500).json({ error: error.message });
      //   }
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
      const { id }: any = req.query;

      try {
        const { success, error }: any = await deleteUser(id);
        if (error) throw new Error(error);
        return res.status(200).json({ success });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    }
  } else {
    return res.status(401).json({ msg: "UnAuthorized" });
  }

  res.setHeader("Allow", ["GET", "DELETE", "PATCH"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
