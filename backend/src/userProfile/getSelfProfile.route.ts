import { Router, Request, Response } from "express";
import { checkAuthMiddleware } from "../middleware/checkAuthMiddleware";
import { handleError } from "../errors/errors";
import { getSelfProfile } from "./userProfile.services";

const router = Router();

router.get("/", checkAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.authUser.user_id;
    const userProfile = await getSelfProfile(userId);

    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.status(200).json({ userProfile });
  } catch (error) {
    handleError(error, res);
  }
});
export default router;
