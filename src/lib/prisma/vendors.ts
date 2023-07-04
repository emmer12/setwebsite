import prisma from ".";

export async function getVendors() {
  try {
    const users = await prisma.user.findMany();
    return { users };
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
