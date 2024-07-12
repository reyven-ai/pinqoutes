import { Router, Request, Response } from "express";
import { handleError } from "../../errors/errors";
import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import { UserPinRepository } from "../pin/pin.repository";
import {
  getSavedPinqoutes,
  hasUserSavedPinqoutes,
  removePin,
  savePin,
} from "./save.services";

const router = Router();

router.post(
  "/:userId/savePin/",
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

      const savedPin = await savePin(data);

      if (!savedPin) {
        return res.status(500).json({ error: "Error saving pin" });
      }

      res.status(200).json(savedPin);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.delete(
  "/:userId/savedPins/:pinId",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = res.locals.authUser.user_id;
      const pinId = req.params.pinId;

      await removePin(userId, pinId);

      res.status(200).json({ message: "Pin removed successfully" });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get(
  "/:userId/savedPins",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      const savedPins = await getSavedPinqoutes(userId);

      res.status(200).json(savedPins);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get("/:userId/:pinId/hasSaved", async (req: Request, res: Response) => {
  try {
    const { userId, pinId } = req.params;
    const hasSaved = await hasUserSavedPinqoutes(userId, pinId);
    res.status(200).json({ hasSaved });
  } catch (error) {
    console.error("Error:", (error as Error).message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
