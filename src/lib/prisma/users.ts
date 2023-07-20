import prisma from ".";
import bcrypt from "bcrypt";

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
