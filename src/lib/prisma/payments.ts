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

export async function logVendorSubscription(vendor_id: string, sub: string) {
  const subscription = JSON.parse(sub);
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

    console.log(vendor);

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
    return { error };
  }
}
