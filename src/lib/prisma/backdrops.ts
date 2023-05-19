import prisma from ".";

export async function getBackdrops() {
  try {
    const backdrops = await prisma.backdrops.findMany();
    return { backdrops };
  } catch (error) {
    return { error };
  }
}

export async function getBackdrop(slug: string) {
  try {
    const backdrop = await prisma.backdrops.findFirst({
      where: { slug: slug },
      include: {
        category: true,
      },
    });
    return { backdrop };
  } catch (error) {
    return { error };
  }
}
