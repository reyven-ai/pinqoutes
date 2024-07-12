import { Router, Request, Response } from "express";
import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import {
  getLikeCount,
  getLikedPinqoutes,
  hasUserLikedPin,
  likePinqoutes,
  unlikePinqoutes,
} from "./likes.services";
import { handleError } from "../../errors/errors";
import { UserPinRepository } from "../pin/pin.repository";

const router = Router();

router.post(
  "/:userId/likedPin/",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { pinId } = req.body;
      const userId = res.locals.authUser.user_id;

      const pinRepository = new UserPinRepository();
      const pin = await pinRepository.getPinDetails(pinId);

      if (!pin) {
        return res.status(404).json({ error: "Pin not found" });
      }

      const data = {
        userId,
        pinId,
        created_at: new Date(),
      };

      const likePin = await likePinqoutes(data);

      if (!likePin) {
        return res.status(500).json({ error: "Error liking pin" });
      }

      res.status(200).json(likePin);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.delete(
  "/:userId/unliked/:pinId",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = res.locals.authUser.user_id;
      const pinId = req.params.pinId;

      await unlikePinqoutes(userId, pinId);

      res.status(200).json({ message: "unlike pinqoutes successfully" });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get(
  "/:userId/likedPinqoutes",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      const likedPinqoutes = await getLikedPinqoutes(userId);

      res.status(200).json(likedPinqoutes);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get("/:pinId/likeCount", async (req: Request, res: Response) => {
  try {
    const { pinId } = req.params;
    const likeCount = await getLikeCount(pinId);
    res.status(200).json({ count: likeCount });
  } catch (error) {
    console.error("Error:", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:userId/:pinId/hasLiked", async (req: Request, res: Response) => {
  try {
    const { userId, pinId } = req.params;
    const hasLiked = await hasUserLikedPin(userId, pinId);
    res.status(200).json({ hasLiked });
  } catch (error) {
    console.error("Error:", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
