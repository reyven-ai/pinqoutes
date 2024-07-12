import { Router, Request, Response } from "express";
import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import { handleError } from "../../errors/errors";
import {
  followOtherUsers,
  getFollowersCount,
  getFollowingCount,
  hasUserFollowedOtherUser,
  unfollow,
} from "./follows.services";

const router = Router();
77;

router.post(
  "/:followedId/follow",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { followedId } = req.params;
      const userId = res.locals.authUser.user_id;
      const data = {
        followerId: userId,
        followedId,
        created_at: new Date(),
      };

      const follow = await followOtherUsers(data);

      if (!follow) {
        return res.status(500).json({ error: "Error following user" });
      }

      res.status(200).json(follow);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.delete(
  "/:followedId/unfollow",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { followedId } = req.params;
      const userId = res.locals.authUser.user_id;

      if (followedId === userId) {
        return res.status(400).json({ error: "Cannot unfollow yourself" });
      }

      await unfollow(userId, followedId);
      res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get(
  "/:followedId/followers",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { followedId } = req.params;
      const count = await getFollowersCount(followedId);
      res.status(200).json({ count });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get(
  "/:followerId/following",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { followerId } = req.params;
      const count = await getFollowingCount(followerId);
      res.status(200).json({ count });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get(
  "/:followerId/isFollowing/:followedId",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = res.locals.authUser.user_id;
      const { followedId } = req.params;

      const following = await hasUserFollowedOtherUser(userId, followedId);

      res.status(200).json({ isFollowing: following });
    } catch (error) {
      handleError(error, res);
    }
  }
);

export default router;
