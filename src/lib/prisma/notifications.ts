import prisma from ".";
import bcrypt from "bcrypt";

export async function createNotifications(data: any) {
  try {
    console.log(data);
    const notification = await prisma.notification.create({ data: data });
    return { notification };
  } catch (error) {
    return { error };
  }
}
export async function getNotifications() {
  try {
    const notifications = await prisma.notification.findMany();
    return { notifications };
  } catch (error) {
    return { error };
  }
}

export async function getUnreadNotifications() {
  try {
    const notification = await prisma.notification.findMany({
      where: { isRead: false },
    });
    return { notification };
  } catch (error) {
    return { error };
  }
}

export async function updateNotification(id: string, data: any) {
  try {
    await prisma.notification.update({
      where: { id: id },
      data: data,
    });
    return { success: true };
  } catch (error) {
    return { error };
  }
}

export async function deleteNotification(id: string) {
  try {
    await prisma.notification.delete({ where: { id: id } });
    return { success: true };
  } catch (error) {
    return { error };
  }
}

export async function createRequest(requests: any) {
  try {
    const record = await prisma.requests.create({ data: requests });
    return { record };
  } catch (error) {
    return { error };
  }
}
