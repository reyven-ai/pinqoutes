import axios from "axios";
import authHeader from "./auth.header";
import { Notification } from "@/types/notification.types";

const notificationUrl = import.meta.env.VITE_API_NOTIFICATIONS;

export const createNotification = async (
  userId: string,
  type: string,
  entityId: number,
  message: string
): Promise<Notification> => {
  const headers = authHeader();

  if (!userId || !type || !entityId || !message) {
    throw new Error("Missing required fields");
  }

  await axios.post(
    `${notificationUrl}`,
    { userId, type, entityId, message },
    { headers }
  );
};

export const getNotifications = async (userId: string): Promise<any[]> => {
  const headers = authHeader();

  if (!userId) {
    throw new Error("User ID is missing");
  }

  const response = await axios.get(`${notificationUrl}/${userId}`, { headers });
  return response.data;
};
export const markAsRead = async (notificationId: number): Promise<void> => {
  const headers = authHeader();

  if (!notificationId) {
    throw new Error("Notification ID is missing");
  }

  await axios.put(`${notificationUrl}/${notificationId}/read`, {}, { headers });
};

export const deleteNotification = async (
  notificationId: number
): Promise<void> => {
  const headers = authHeader();

  if (!notificationId) {
    throw new Error("Notification ID is missing");
  }

  await axios.delete(`${notificationUrl}/${notificationId}`, { headers });
};
