import path from "path";
import prisma from ".";
import { sendBackdropPurchaseEmail } from "../mailer";
import constants from "../utils/constants";

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

    // Send Email

    let att = order?.items.map((item) => {
      console.log(item.backdrop);
      return {
        filename: "backdrop-files.pdf",
        path: path.resolve(`./src/assets/${item.backdrop.filePath}`),
      };
    });

    const data = {
      email: order?.email,
      full_name: order?.fullName,
      attachments: att,
    };

    await sendBackdropPurchaseEmail(data);

    return true;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export async function logVendorSubscription(
  vendor_id: string,
  sub: string,
  transactionId: string
) {
  const subscription = JSON.parse(sub);
  const today = new Date();
  // Add one year to today's date
  let endingDate = new Date();
  endingDate.setFullYear(today.getFullYear() + 1);

  console.log("THis is it");
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

      await prisma.subscription.create({
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
        await prisma.subscription.create({
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
      }

      await prisma.transactionLog.create({
        data: {
          description: `Vendor Subscription`,
          orderId: subscription.id,
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
