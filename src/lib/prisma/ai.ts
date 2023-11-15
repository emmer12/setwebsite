import prisma from ".";
import constants from "../utils/constants";
import { debitPoint } from "./users";

export async function generate(data: any, user: any) {
  try {
    const amount = constants.points.AI

    if (user.ai_points < amount && user.role !== constants.roles.ADMIN) {
      throw new Error("You don't have enough funds");
    }

    const genRes: any = await fetch(`${process.env.AI_BASE_URL}/image/create`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "authorization": process.env.KEY as string
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    });

    const res = await genRes.json();

    if (user.role !== constants.roles.ADMIN) {
      const { error }: any = await debitPoint(amount, user, constants.payment_type.AI_DEBIT);
      if (error) {
        throw new Error(error.message);
      }
    }


    return { id: res.id, };
    // return { id: "qvqgpdJgOu3pqH" };
  } catch (error) {
    return { error };
  }
}


export async function save(data: any, id: string) {
  try {

    const saved = await prisma.savedImages.findFirst({
      where: {
        url: data.url
      }
    })

    if (saved) throw new Error("Image has already been saved")

    const record = await prisma.savedImages.create({
      data: {
        userId: id,
        collection_id: data.collection_id,
        url: data.url
      },
    });
    return { record };
  }
  catch (error) {
    return { error };
  }
}


export async function getAll(userId: string) {
  try {
    const images = await prisma.savedImages.findMany({
      where: {
        userId: userId
      }
    });
    return { images };
  }
  catch (error) {
    return { error };
  }
}


export async function remove(id: string) {
  try {
    await prisma.savedImages.delete({
      where: {
        id: id
      }
    });
    return { record: true };
  }
  catch (error) {
    return { error };
  }
}