// notifications.repository.ts
import pool from "../../database/db";
import { Notification } from "./notifications.types";

class NotificationRepository {
  async createNotification(
    userId: string,
    type: string,
    entityId: number,
    message: string
  ): Promise<Notification | null> {
    try {
      const query =
        "INSERT INTO notifications (user_id, type, entity_id, message, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *";
      const result = await pool.query(query, [userId, type, entityId, message]);

      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        throw new Error("Error creating notification");
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error creating notification");
    }
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    try {
      const query =
        "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC";
      const result = await pool.query(query, [userId]);

      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error fetching notifications");
    }
  }

  async markAsRead(notificationId: number): Promise<void> {
    try {
      const query = "UPDATE notifications SET read = true WHERE id = $1";
      await pool.query(query, [notificationId]);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error marking notification as read");
    }
  }

  async deleteNotification(notificationId: number): Promise<void> {
    try {
      const query = "DELETE FROM notifications WHERE id = $1";
      await pool.query(query, [notificationId]);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      throw new Error("Error deleting notification");
    }
  }
}

export { NotificationRepository };
