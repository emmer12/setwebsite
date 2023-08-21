import path from "path";
import prisma from ".";
import { sendBackdropPurchaseEmail } from "../mailer";
import constants from "../utils/constants";
import { sendAllVendorsQuotes } from "./vendors";

export async function logBackdropPayment(
  order_id: string,
  transactionId: string
) {
  try {
    const order = await prisma.backdropOrder.findFirst({
      where: {
        id: order_id,
      },
      include: {
        items: {
          include: {
            backdrop: true,
          },
        },
      },
    });
    await prisma.backdropOrder.update({
      where: {
        id: order_id,
      },
      data: {
        paymentStatus: constants.payment_status.PAID as any,
      },
    });

    await prisma.transactionLog.create({
      data: {
        description: `Backdrop Purchased`,
        orderId: order_id,
        type: "BACKDROP",
        transactionId,
      },
    });

    // Send Email to Buyer
    let att = order?.items.map((item) => {
      if (item.license == "COMMERCIAL") {
        return {
          filename: "backdrop-commercial-files.pdf",
          path: path.resolve(`./src/assets/${item.backdrop.filePath2}`),
        };
      } else {
        return {
          filename: "backdrop-personal-files.pdf",
          path: path.resolve(`./src/assets/${item.backdrop.filePath}`),
        };
      }
    });

    const data = {
      email: order?.email,
      full_name: order?.fullName,
      attachments: att,
    };

    await sendBackdropPurchaseEmail(data);

    const request: any = await prisma.requests.findFirst({
      where: {
        orderId: order?.id,
      },
    });
    // Send Email to Vendor
    if (order?.bp_quote) {
      await sendAllVendorsQuotes(request.id);
    }

    if (order?.ep_quote) {
      await sendAllVendorsQuotes(request.id, "64bbebce9b72b64fc88a2576");
    }

    return true;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export async function logAccountTopUp(
  user_id: string,
  amount: number,
  transactionId: string
) {
  const user: any = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  const points = user?.points + Number(amount);

  await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      points: Number(points),
    },
  });

  await prisma.transactionLog.create({
    data: {
      description: `Account top up`,
      orderId: user_id,
      type: "TOP_UP",
      transactionId,
      amount: Number(amount),
    },
  });
}

export async function logVendorSubscription(
  vendor_id: string,
  sub: string,
  transactionId: string
) {
  const subscription = JSON.parse(sub);
  const today = new Date();
  let newSub;
  // Add one year to today's date
  let endingDate = new Date();
  endingDate.setFullYear(today.getFullYear() + 1);

  console.log("This is it");
  try {
    const vendor = await prisma.vendor.findFirst({
      where: {
        id: vendor_id,
      },
      include: {
        user: true,
      },
    });

    if (vendor) {
      await prisma.vendor.update({
        where: {
          id: vendor_id,
        },
        data: {
          profile_sub: true,
          quote_sub: subscription.quote_sub,
        },
      });

      newSub = await prisma.subscription.create({
        data: {
          price: constants.vendor_subscriptions.QUOTE,
          service: constants.subscription_type.VENDOR_BASIC as any,
          description: "Vendor Quote subscription",
          userId: vendor.user.id,
          start_date: today,
          end_date: endingDate,
          paymentStatus: constants.payment_status.PAID as any,
        },
      });

      if (subscription.quote_sub) {
        newSub = await prisma.subscription.create({
          data: {
            price: constants.vendor_subscriptions.QUOTE,
            service: constants.subscription_type.VENDOR_PRO as any,
            description: "Vendor Quote subscription",
            userId: vendor.user.id,
            start_date: today,
            end_date: endingDate,
            paymentStatus: constants.payment_status.PAID as any,
          },
        });

        await prisma.vendor.update({
          where: {
            id: vendor_id,
          },
          data: {
            quote_sub_exp: endingDate,
          },
        });
      }

      await prisma.transactionLog.create({
        data: {
          description: `Vendor Subscription`,
          orderId: newSub.id,
          type: "VENDOR",
          transactionId,
        },
      });

      await prisma.user.update({
        where: {
          id: vendor.user.id,
        },
        data: {
          role: "VENDOR",
        },
      });

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export async function logSubscription(sub_id: string, transactionId: string) {
  const today = new Date();
  // Add one year to today's date
  let endingDate = new Date();
  endingDate.setFullYear(today.getFullYear() + 1);

  try {
    const subscription = await prisma.subscription.findFirst({
      where: {
        id: sub_id,
      },
      include: {
        user: true,
      },
    });

    if (subscription) {
      await prisma.subscription.update({
        where: {
          id: sub_id,
        },
        data: {
          start_date: today,
          end_date: endingDate,
          paymentStatus: constants.payment_status.PAID as any,
        },
      });

      await prisma.transactionLog.create({
        data: {
          description: `${subscription.service} Subscription`,
          orderId: subscription.id,
          type:
            subscription.service == "SAF_BASIC" || "SAF_PRO"
              ? "SAF"
              : "DEE_DIGITAL",
          transactionId,
        },
      });

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}
