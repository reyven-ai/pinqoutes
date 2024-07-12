import { Router, Request, Response } from "express";
import { handleError } from "../../errors/errors";
import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import { getUserPins } from "../pin/pin.services";

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

export default router;
