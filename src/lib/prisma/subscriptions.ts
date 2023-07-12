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

export const getSubscriptions = async (id: any) => {
  const today = new Date();

  const vendor = await prisma.vendor.findFirst({
    where: { userId: id },
  });

  const subscriptions = await prisma.subscription.findMany({
    where: {
      paymentStatus: "PAID",
      end_date: { gte: today },
      userId: id,
    },
    select: {
      end_date: true,
      start_date: true,
      service: true,
    },
  });

  console.log(vendor, "this");
  console.log(id, "id");

  return {
    subscriptions,
    vendor,
  };
};
