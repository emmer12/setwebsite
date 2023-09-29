import prisma from ".";
import constants from "../utils/constants";
import { debitPoint } from "./users";

export async function generate(data: any, user: any) {
  try {
    const amount = constants.points.AI

    if (user.saf_points < amount) {
      throw new Error("You have enough funds to set users");
    }

    const genRes: any = await fetch(`${process.env.AI_BASE_URL}/image/create`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data)
    });

    const res = await genRes.json();

    // const { error }: any = await debitPoint(amount, user, constants.payment_type.AI_DEBIT);

    // if (error) {
    //   throw new Error(error.message);
    // }
    return { id: res.id };
  } catch (error) {
    return { error };
  }
}
