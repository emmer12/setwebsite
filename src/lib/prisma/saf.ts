import prisma from ".";

export async function createUser(data: any) {
  try {
    const users = data.users;
    if (users.length < 1) throw new Error("User cannot be less than one");

    for (let i = 0; i < users.length; i++) {
      console.log(users[i].name);
    }
    // const userFromDB = await prisma.user.create({ data: user });
    return { user: true };
  } catch (error) {
    return { error };
  }
}
