import { NotificationRepository } from "./notifications.repository";
import { Notification } from "./notifications.types";

export async function createNotification(
  data: Notification
): Promise<Notification | null> {
  try {
    const notificationRepository = new NotificationRepository();
    const notification = await notificationRepository.createNotification(
      data.userId,
      data.type,
      data.entityId,
      data.message
    );

    if (!notification) {
      return null;
    }

    return notification;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating notification.");
  }
}

export async function getNotifications(
  userId: string
): Promise<Notification[]> {
  try {
    const notificationRepository = new NotificationRepository();
    const notifications = await notificationRepository.getNotifications(userId);
    return notifications;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching notifications.");
  }
}

export async function markAsRead(notificationId: number): Promise<void> {
  try {
    const notificationRepository = new NotificationRepository();
    await notificationRepository.markAsRead(notificationId);
  } catch (error) {
    console.error(error);
    throw new Error("Error marking notification as read.");
  }
}

// Delete a notification
export async function deleteNotification(
  notificationId: number
): Promise<void> {
  try {
    const notificationRepository = new NotificationRepository();
    await notificationRepository.deleteNotification(notificationId);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting notification.");
  }
}
