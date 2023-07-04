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
