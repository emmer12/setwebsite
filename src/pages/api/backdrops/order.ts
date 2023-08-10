import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { backdropOrderSchema } from "@/lib/utils/validations";
import { processUserRegistration } from "@/lib/prisma/users";
import { getToken } from "next-auth/jwt";
import { IBackdropFileType } from "@/types";
const shortid = require("shortid");
const ObjectId = require("mongodb").ObjectId;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data: any = JSON.parse(req.body);
    const validate = backdropOrderSchema.safeParse(data);
    const token = await getToken({ req });
    let user;

    if (!validate.success) {
      const { errors } = validate.error;
      return res.status(400).json({
        error: { message: "Invalid request", errors },
      });
    }

    try {
      if (token) {
        user = token;
        data.userId = token.id;
      } else {
        const userData = {
          email: data.email,
          name: data.full_name,
          password: data.password,
        };
        user = await processUserRegistration(userData, res);
        data.userId = user.id;
      }

      const items = JSON.parse(data.items);
      let totalPrice = 0;

      for (const item of items) {
        const backdrop = await prisma.backdrops.findUnique({
          where: { id: item.id },
        });

        if (item.price_type == IBackdropFileType.personal_price) {
          totalPrice += backdrop?.personal_price as number;
        } else {
          totalPrice += backdrop?.commercial_price as number;
        }
      }

      const newOrder = await prisma.backdropOrder.create({
        data: {
          fullName: data.full_name,
          email: data.email,
          code: shortid.generate(),
          country: data.country,
          address: data.address,
          totalPrice: totalPrice,
          bp_quote: data.bp_quote,
          ep_quote: data.ep_quote,
        },
      });

      items.forEach(async (item: any) => {
        await prisma.backdropOrderItem.create({
          data: {
            orderId: newOrder.id,
            backdropId: item.id,
            price: item.price,
            title: item.title,
            license:
              item.price_type == IBackdropFileType.commercial_price
                ? "COMMERCIAL"
                : "PERSONAL",
          },
        });
      });

      if (data.bp_quote) {
        await prisma.requests.create({
          data: {
            request_type: "BACKDROP_PRODUCTION",
            orderId: newOrder.id,
            userId: user.id,
            categoryId: user.id,
          },
        });
      }

      if (data.ep_quote) {
        await prisma.requests.create({
          data: {
            request_type: "EVENT_PLANNING",
            orderId: newOrder.id,
            additional_request: data.additional_request,
            event_date: data.event_date,
            location: data.location,
            occasion: data.occasion,
            people_number: data.people_number,
            userId: user.id,
            categoryId: user.id,
          },
        });
      }

      res.status(201).json({ newOrder });
    } catch (error) {
      res.status(500).json({ error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
    res.status(425).end(`Method ${req.method} is not allowed.`);
  }
};

export default handler;
