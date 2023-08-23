import prisma from ".";
import constants from "../utils/constants";
import { debitPoint } from "./users";

export async function createUser(data: any, user: any) {
  try {
    const users = data.users;
    if (users.length < 1) throw new Error("User cannot be less than one");
    const { error }: any = await debitPoint(constants.points.AI * users.length, user, constants.payment_type.SAF_TOP_UP);

    if (error) {
      throw new Error(error.message);
    }

    for (let i = 0; i < users.length; i++) {
      console.log(users[i].name, "Username");
    }
    // const userFromDB = await prisma.user.create({ data: user });
    return { user: true };
  } catch (error) {
    return { error };
  }
}
