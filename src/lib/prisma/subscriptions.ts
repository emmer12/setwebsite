import prisma from ".";

export async function createSubscription(sub: any) {
  try {
    const result = await prisma.subscription.create({ data: sub });
    return { sub: result };
  } catch (error) {
    return { error };
  }
}

export async function getSubById(id: string) {
  try {
    const sub = await prisma.subscription.findUnique({
      where: { id },
      include: { user: true },
    });

    return { sub };
  } catch (error) {
    return { error };
  }
}
