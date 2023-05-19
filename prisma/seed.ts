const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const category1 = await prisma.backdropCategory.create({
    data: {
      title: "Birthday",
      slug: "birthday",
      description: "Birthdays",
      Backdrops: {
        create: [
          {
            title: "Backdrop 1",
            description: "This is the description",
            price: 200,
            discount: 5,
            addOn: ["Cake", "Acrylics", "Invitation"],
            stockStatus: "IN_STOCK",
            slug: "backdrop-1",
          },
          {
            title: "Backdrop 2",
            description: "This is the description",
            price: 200,
            discount: 10,
            addOn: ["Cake", "Acrylics", "Invitation", "Flowers"],
            stockStatus: "IN_STOCK",
            slug: "backdrop-2",
          },
          {
            title: "Backdrop 3",
            description: "This is the description",
            discount: 5,
            addOn: ["Cake", "Acrylics", "Invitation", "Flowers"],
            stockStatus: "IN_STOCK",
            price: 200,
            slug: "backdrop-3",
          },
        ],
      },
    },
  });

  const category2 = await prisma.backdropCategory.create({
    data: {
      title: "Wedding",
      slug: "wedding",
      description: "Weddings",
      Backdrops: {
        create: [
          {
            title: "Backdrop 4",
            description: "This is the description",
            price: 200,
            discount: 5,
            addOn: ["Cake", "Acrylics", "Invitation", "Flowers"],
            stockStatus: "IN_STOCK",
            slug: "backdrop-4",
          },
          {
            title: "Backdrop 5",
            description: "This is the description",
            price: 200,
            discount: 5,
            addOn: ["Cake", "Acrylics", "Invitation", "Flowers"],
            stockStatus: "IN_STOCK",
            slug: "backdrop-5",
          },
          {
            title: "Backdrop 6",
            description: "This is the description",
            price: 200,
            discount: 20,
            addOn: ["Cake", "Acrylics", "Flowers"],
            stockStatus: "IN_STOCK",
            slug: "backdrop-6",
          },
        ],
      },
    },
  });

  const category3 = await prisma.backdropCategory.create({
    data: {
      title: "Baby Shawer",
      slug: "baby-shawer",
      description: "Baby Shawer",
      Backdrops: {
        create: [
          {
            title: "Backdrop 7",
            description: "This is the description",
            discount: 30,
            addOn: ["Cake", "Acrylics", "Invitation", "Flowers"],
            stockStatus: "IN_STOCK",
            price: 200,
            slug: "backdrop-7",
          },
          {
            title: "Backdrop 8",
            description: "This is the description",
            discount: 5,
            addOn: ["Cake", "Acrylics", "Invitation", "Flowers"],
            stockStatus: "IN_STOCK",
            price: 200,
            slug: "backdrop-8",
          },
          {
            title: "Backdrop 9",
            description: "This is the description",
            discount: 3,
            addOn: ["Cake", "Invitation", "Flowers"],
            stockStatus: "IN_STOCK",
            price: 200,
            slug: "backdrop-9",
          },
        ],
      },
    },
  });

  console.log(category1, category2, category3);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
