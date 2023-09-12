import { Vendor } from "@prisma/client";
import prisma from ".";
import { sendEventQuoteRequestEmail, sendQuoteRequestEmail } from "../mailer";
import constant from "../utils/constants";

export async function getVendors(page: any, limit: number) {
  const offset = (page - 1) * limit;
  const today = new Date();
  try {
    const vendors = await prisma.vendor.findMany({
      skip: offset,
      take: limit,
      where: {
        approval_status: constant.approval_status.APPROVED as any,
      },
      include: {
        VendorImage: true
      }
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


export async function updateVendor(vendor: any, id: string) {
  try {
    const vendorFromDB = await prisma.vendor.update({
      where: {
        id: id
      },
      data: vendor
    });
    return { vendor: vendorFromDB };
  } catch (error) {
    return { error };
  }
}

export async function getVendor(userId: any) {
  try {
    const vendor = await prisma.vendor.findFirst({
      where: { userId: userId, },
      include: {
        VendorImage: true,
        VendorCategory: true,
        VendorSubCategory: true
      }
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
      include: { user: true, VendorImage: true },
    });

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
      await sendQuoteRequestEmail(vendor);
    }
  });
}

export async function createQuote(requests: any) {
  try {
    const record = await prisma.quote.create({ data: requests });
    return { record };
  } catch (error) {
    return { error };
  }
}

export async function getQuotes(page: any, limit: number, id: any) {
  const offset = (page - 1) * limit;
  try {
    const requests = await prisma.requests.findMany({
      skip: offset,
      take: limit,
      where: {
        userId: id,
      },
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

export async function getRequests(page: any, limit: number, id: any) {
  const offset = (page - 1) * limit;
  try {
    const requests = await prisma.requests.findMany({
      skip: offset,
      take: limit,
      where: {
        vendorsIds: {
          some: { userId: id },
        },
      },
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

export async function getRequestQuote(id: string) {
  try {
    const quote = await prisma.quote.findFirst({
      where: { requestId: id },
      include: { request: true },
    });
    return { quote };
  } catch (error) {
    return { error };
  }
}

export async function storeImage(path: string, name: string, vendor_id: string | undefined) {
  try {
    console.log({ path, name, vendor_id })
    const record = await prisma.vendorImage.create({
      data: {
        filename: name,
        url: path,
        vendorId: vendor_id as string,

      }
    })
    return { record };
  } catch (error) {
    console.log(error, "This is the error")
    return { error };
  }
}

// function sendEventQuoteRequestEmail(vendor: Vendor, requestId: string) {
//   throw new Error("Function not implemented.");
// }
