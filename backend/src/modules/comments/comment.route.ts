import { Router, Request, Response } from "express";
import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import { UserPinRepository } from "../pin/pin.repository";
import {
  commentPinqoutes,
  getCommentCount,
  getcommentPinqoutes,
  hasUserCommentPin,
} from "./comment.services";
import { handleError } from "../../errors/errors";

const router = Router();

router.post(
  "/:userId/commentPin",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { pinId, comment } = req.body;
      const userId = res.locals.authUser.user_id;

      console.log("Received userId:", userId);
      console.log("Received pinId:", pinId);

      const pinRepository = new UserPinRepository();
      const pin = await pinRepository.getPinDetails(pinId);

      if (!pin) {
        console.log("Pin not found with pinId:", pinId);
        return res.status(404).json({ error: "Pin not found" });
      }

      const data = {
        userId,
        pinId,
        comment,
        created_at: new Date(),
      };

      const commentPin = await commentPinqoutes(data);

      if (!commentPin) {
        console.log("Error saving comment for data:", data);
        return res.status(500).json({ error: "Error saving comment" });
      }

      res.status(200).json(commentPin);
    } catch (error) {
      console.error("Error in commentPin route:", error);
      handleError(error, res);
    }
  }
);

router.get(
  "/:pinId/comments",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { pinId } = req.params;

      const commentPinqoutes = await getcommentPinqoutes(pinId);

      res.status(200).json(commentPinqoutes);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get("/:pinId/commentCount", async (req: Request, res: Response) => {
  try {
    const { pinId } = req.params;
    const commentCount = await getCommentCount(pinId);
    res.status(200).json({ count: commentCount });
  } catch (error) {
    console.error("Error:", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(
  "/:userId/:pinId/hasComment",
  async (req: Request, res: Response) => {
    try {
      const { userId, pinId } = req.params;
      const hasComment = await hasUserCommentPin(userId, pinId);
      res.status(200).json({ hasComment });
    } catch (error) {
      console.error("Error:", (error as Error).message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
