import prisma from ".";

export async function getBackdrops() {
  try {
    const backdrops = await prisma.backdrops.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
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

export async function createBackdrops(backdrop: any) {
  try {
    const backdropFromDB = await prisma.backdrops.create({ data: backdrop });
    return { backdrop: backdropFromDB };
  } catch (error) {
    return { error };
  }
}

export async function getAllBackdrops(page: any, limit: number) {
  const offset = (page - 1) * limit;
  const today = new Date();

  try {
    const backdrops = await prisma.backdrops.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await prisma.vendor.count();

    const totalPages = Math.ceil(totalCount / limit);

    const nextPage = page < totalPages ? parseInt(page) + 1 : null;
    const prevPage = page > 1 ? parseInt(page) - 1 : null;

    return { backdrops, nextPage, prevPage, totalPages };
  } catch (error) {
    return { error };
  }
}
