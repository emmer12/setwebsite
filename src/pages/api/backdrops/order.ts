import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
const shortid = require("shortid");
const ObjectId = require("mongodb").ObjectId;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data: any = JSON.parse(req.body);

    try {
      const newOrder = await prisma.backdropOrder.create({
        data: {
          fullName: data.full_name,
          email: data.email,
          code: shortid.generate(),
          country: data.country,
          address: data.address,
          totalPrice: data.total,
          bp_quote: data.bp_quote,
          ep_quote: data.ep_quote,
        },
      });

      const items = JSON.parse(data.items);

      items.forEach(async (item: any) => {
        await prisma.backdropOrderItem.create({
          data: {
            orderId: newOrder.id,
            backdropId: item.id,
            price: item.price,
            title: item.title,
          },
        });
      });

      if (data.bp_quote) {
        await prisma.requests.create({
          data: {
            request_type: "BACKDROP_PRODUCTION",
            orderId: newOrder.id,
          },
        });
      }

      if (data.ep_quote) {
        await prisma.requests.create({
          data: {
            request_type: "EVENT_PLANNING",
            orderId: newOrder.id,
            additional_request: data.additional_request,
            event_date: new Date(data.event_date),
            location: data.location,
            occasion: data.occasion,
            people_number: data.people_number,
          },
        });
      }

      res.status(201).json({ newOrder });
    } catch (error) {
      console.log(error);
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
