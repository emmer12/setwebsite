import prisma from ".";
import bcrypt from "bcrypt";
import { addHours } from "date-fns";
import constants from "../utils/constants";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return { users };
  } catch (error) {
    return { error };
  }
}

export async function createUser(user: any) {
  try {
    const userFromDB = await prisma.user.create({ data: user });
    return { user: userFromDB };
  } catch (error) {
    return { error };
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      //   include: { des: true },
    });
    return { user };
  } catch (error) {
    return { error };
  }
}

export async function processUserRegistration(userData: any, res: any) {
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

  return newUser;
}

export async function getAllUsers(page: any, limit: number) {
  const offset = (page - 1) * limit;

  try {
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await prisma.user.count();

    const totalPages = Math.ceil(totalCount / limit);

    const nextPage = page < totalPages ? parseInt(page) + 1 : null;
    const prevPage = page > 1 ? parseInt(page) - 1 : null;

    return { users, nextPage, prevPage, totalPages };
  } catch (error) {
    return { error };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id: id } });
    return { success: true };
  } catch (error) {
    return { error };
  }
}

export async function createRequest(requests: any) {
  try {
    const record = await prisma.requests.create({ data: requests });
    return { record };
  } catch (error) {
    return { error };
  }
}

export async function getRequests(page: any, limit: number, id: any) {
  const offset = (page - 1) * limit;
  try {
    const requests = await prisma.requests.findMany({
      skip: offset,
      take: limit,
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const totalCount = await prisma.requests.count();

    const totalPages = Math.ceil(totalCount / limit);

    const nextPage = page < totalPages ? parseInt(page) + 1 : null;
    const prevPage = page > 1 ? parseInt(page) - 1 : null;

    return { requests, nextPage, prevPage, totalPages };
  } catch (error) {
    return { error };
  }
}

export async function createPasswordResetToken(userId: string, token: string) {
  const expiresAt = addHours(new Date(), 1); // Set to expire 1 hour from now
  await prisma.passwordResetToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });
}

export const debitPoint = async (amount: number, user: any, type: string) => {
  try {
    if (user.points < amount) {
      throw new Error("You have enough funds to set users");
    }

    let data: any = {};

    if (type == constants.payment_type.AI_DEBIT) {
      const points = Number(user?.ai_points) - Number(amount);
      data.ai_points = points;
    } else {
      const points = user?.saf_points - Number(amount);
      data.saf_points = points;
    }


    const record = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: data
    });
    return { record };
  } catch (error) {
    return { error };
  }
};


export const createConversation = async (sender: any, receiver: any) => {
  const conversation: any = await prisma.conversation.findFirst({
    where: {
      OR: [
        {
          senderId: sender.id,
          receiverId: receiver.id
        },
        {
          receiverId: sender.id,
          senderId: receiver.id
        }
      ]
    }
  });


  if (!conversation) {
    const newConversation = await prisma.conversation.create({
      data: {
        senderId: sender.id,
        receiverId: receiver.id,
        name: sender.name + '&' + receiver.name,
        userId: sender.id
      },
    });
  }

}


export async function getRequestQuotes(id: string, userId: string, page: any, limit: number) {
  const offset = (page - 1) * limit;

  try {
    const quotes = await prisma.quote.findMany({
      where: {
        requestId: id,
        userId
      },
      skip: offset,
      take: limit,
      include: {
        user: {
          include: {
            Vendor: {
              select: {
                company_name: true,
              },
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await prisma.quote.count();

    const totalPages = Math.ceil(totalCount / limit);

    const nextPage = page < totalPages ? parseInt(page) + 1 : null;
    const prevPage = page > 1 ? parseInt(page) - 1 : null;

    return { quotes, nextPage, prevPage, totalPages };
  } catch (error) {
    return { error };
  }
}