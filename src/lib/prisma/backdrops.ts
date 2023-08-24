import prisma from ".";
import { paginate } from "../utils";

export async function getBackdrops(page = 1, limit = 20, query?: any) {
  const offset = (page - 1) * limit;
  let minMax = {};
  if (query.min && query.max) {
    minMax = {
      OR: {
        personal_price: {
          gte: parseFloat(query.min),
          lte: parseFloat(query.max),
        },
        commercial_price: {
          gte: parseFloat(query.min),
          lte: parseFloat(query.max),
        },
      },
    };
  }
  try {
    const backdrops = await prisma.backdrops.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: limit,
      where: {
        category: {
          slug: query.category,
        },
        ...minMax,
      },
    });

    const totalCount = await prisma.backdrops.count();

    const { nextPage, prevPage, totalPages } = paginate(
      totalCount,
      page,
      limit
    );
    return { backdrops, nextPage, prevPage, totalPages };
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
    const relatedBackdrops = await prisma.backdrops.findMany({
      where: {
        categoryId: backdrop?.categoryId,
        NOT: {
          id: backdrop?.id,
        },
      },
      take: 4,
    });

    return { backdrop, relatedBackdrops };
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

    const totalCount = await prisma.backdrops.count();

    const { nextPage, prevPage, totalPages } = paginate(
      totalCount,
      page,
      limit
    );

    return { backdrops, nextPage, prevPage, totalPages };
  } catch (error) {
    return { error };
  }
}

export async function deleteBackdrop(id: string) {
  try {
    await prisma.backdrops.delete({ where: { id: id } });
    return { success: true };
  } catch (error) {
    return { error };
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.backdropCategory.findMany();
    return { categories };
  } catch (error) {
    return { error };
  }
}

export async function getOrderById(id: string) {
  try {
    const order = await prisma.backdropOrder.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            backdrop: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    return { order };
  } catch (error) {
    return { error };
  }
}
