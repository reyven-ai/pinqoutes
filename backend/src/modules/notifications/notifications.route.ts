import { Router, Request, Response } from "express";
import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
} from "./notifications.services";
import { handleError } from "../../errors/errors";

const router = Router();

router.post("/", checkAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const { type, entityId, message } = req.body;
    const userId = res.locals.authUser.user_id;

    const notificationData = {
      userId,
      type,
      entityId,
      message,
    };

    const notification = await createNotification(notificationData);

    if (!notification) {
      return res.status(500).json({ error: "Error creating notification" });
    }

    res.status(200).json(notification);
  } catch (error) {
    handleError(error, res);
  }
});

router.get(
  "/:userId",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = res.locals.authUser.user_id;

      const notifications = await getNotifications(userId);

      res.status(200).json(notifications);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.put(
  "/:notificationId/read",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const notificationId = parseInt(req.params.notificationId, 10);

      await markAsRead(notificationId);

      res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.delete(
  "/:notificationId",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const notificationId = parseInt(req.params.notificationId, 10);

      await deleteNotification(notificationId);

      res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
      handleError(error, res);
    }
  }
);

export default router;
