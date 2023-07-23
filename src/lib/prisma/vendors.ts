import { Vendor } from "@prisma/client";
import prisma from ".";
import { sendEventQuoteRequestEmail, sendQuoteRequestEmail } from "../mailer";

export async function getVendors(page: any, limit: number) {
  const offset = (page - 1) * limit;
  const today = new Date();
  try {
    const vendors = await prisma.vendor.findMany({
      skip: offset,
      take: limit,
      where: {
        profile_sub_exp: {
          not: null,
          gte: today,
        },
      },
    });

    const totalCount = await prisma.vendor.count();

    const totalPages = Math.ceil(totalCount / limit);

    const nextPage = page < totalPages ? parseInt(page) + 1 : null;
    const prevPage = page > 1 ? parseInt(page) - 1 : null;

    return { vendors, nextPage, prevPage, totalPages };
  } catch (error) {
    return { error };
  }
}

export async function createVendor(vendor: any) {
  try {
    const vendorFromDB = await prisma.vendor.create({ data: vendor });
    console.log(vendorFromDB);
    return { vendor: vendorFromDB };
  } catch (error) {
    return { error };
  }
}

export async function getVendor(userId: any) {
  try {
    const vendor = await prisma.vendor.findFirst({
      where: { userId: userId },
    });

    return { vendor };
  } catch (error) {
    return { error };
  }
}

export async function getVendorById(id: string) {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: { id },
      include: { user: true },
    });

    console.log(vendor);

    return { vendor };
  } catch (error) {
    return { error };
  }
}

export async function getVendorBySlug(id: string) {
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

export async function getCategories() {
  try {
    const categories = await prisma.vendorCategory.findMany();
    return { categories };
  } catch (error) {
    return { error };
  }
}

export async function sendAllVendorsQuotes(
  requestId: string,
  categoryId?: string
) {
  const today = new Date();

  const query = categoryId ? { vendorCategoryId: categoryId } : {};
  const vendors = await prisma.vendor.findMany({
    where: {
      ...query,
      quote_sub: true,
      quote_sub_exp: {
        not: null,
        gte: today,
      },
    },
  });

  vendors.forEach(async (vendor) => {
    if (categoryId) {
      await sendEventQuoteRequestEmail(vendor, requestId);
    } else {
      await sendQuoteRequestEmail(vendor, requestId);
    }
  });
}
// function sendEventQuoteRequestEmail(vendor: Vendor, requestId: string) {
//   throw new Error("Function not implemented.");
// }
