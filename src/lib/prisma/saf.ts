import prisma from ".";
import constants from "../utils/constants";
import { debitPoint } from "./users";

export async function createUser(data: any, user: any) {
  try {
    const users = data.users;


    if (users.length < 1) throw new Error("User cannot be less than one");
    const amount = constants.points.SAF * users.length


    if (user.saf_points < amount && user.role !== constants.roles.ADMIN) {
      throw new Error("You have enough funds to set users");
    }

    for (let i = 0; i < users.length; i++) {
      users[i].id = user.id;
      users[i].date = new Date(users[i].date).getTime();

      const response: any = await fetch(`${process.env.AI_BASE_URL}/customer/event`, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "authorization": process.env.NEXT_PUBLIC_KEY as string
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(users[i])
      });
    }


    const { error }: any = await debitPoint(amount, user, constants.payment_type.SAF_DEBIT);

    if (error) {
      throw new Error(error.message);
    }
    // const userFromDB = await prisma.user.create({ data: user });
    return { user: true };
  } catch (error) {
    return { error };
  }
}
