import { Router, Request, Response } from "express";
import { handleError } from "../../errors/errors";
import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import { getUserPins } from "../pin/pin.services";
import { getSavedPins, removePin, savePin } from "./users.save.services";
import { UserPinRepository } from "../pin/pin.repository";

const router = Router();

router.get(
  "/:userId/pins",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const userPins = await getUserPins(userId);

      if (!userPins) {
        return res.status(404).json({ error: "User pins not found" });
      }

      res.status(200).json(userPins);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.post(
  "/:userId/savePin/",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { pinId } = req.body;
      const userId = req.params.userId;

      const pinRepository = new UserPinRepository();
      const pin = await pinRepository.getPinDetails(pinId);

      if (!pin) {
        return res.status(404).json({ error: "Pin not found" });
      }

      const data = {
        userId,
        pinId,
        title: pin.title,
        description: pin.description,
        image_url: pin.image_url,
        created_at: new Date(),
        created_by: pin.created_by,
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
      const userId = req.params.userId;
      const pinId = req.params.pinId; // Extract pinId from the request params

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

      const savedPins = await getSavedPins(userId);

      res.status(200).json(savedPins);
    } catch (error) {
      handleError(error, res);
    }
  }
);

export default router;
