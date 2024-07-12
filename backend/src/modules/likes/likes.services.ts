import { PinData } from "../pin/pin.types";
import { UserLikesRepository } from "./likes.repository";
import { LikedData, Likes } from "./likes.types";

export async function likePinqoutes(data: Likes): Promise<LikedData | null> {
  try {
    const likeRepository = new UserLikesRepository();
    const likedPin = await likeRepository.createLikes(
      data.userId,
      data.pinId,
      data.created_at
    );

    if (!likedPin) {
      return null;
    }

    return likedPin;
  } catch (error) {
    console.error(error);
    throw new Error("Error liking pin.");
  }
}

export async function unlikePinqoutes(
  userId: string,
  pinId: string
): Promise<void> {
  try {
    const likeRepository = new UserLikesRepository();
    await likeRepository.removeLikes(userId, pinId);
  } catch (error) {
    console.error(error);
    throw new Error("Error removing like pinqoutes.");
  }
}

export async function getLikedPinqoutes(userId: string): Promise<PinData[]> {
  try {
    const likeRepository = new UserLikesRepository();
    const likedPinqoutes = await likeRepository.getLiked(userId);
    return likedPinqoutes;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching liked pinqoutes.");
  }
}

export async function getLikeCount(pinId: string): Promise<number> {
  try {
    const likeRepository = new UserLikesRepository();
    const likeCount = await likeRepository.countLikesForPin(pinId);
    return likeCount;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching likes count.");
  }
}

export async function hasUserLikedPin(
  userId: string,
  pinId: string
): Promise<boolean> {
  try {
    const likeRepository = new UserLikesRepository();
    const hasLiked = await likeRepository.hasUserLikedPin(userId, pinId);
    return hasLiked;
  } catch (error) {
    console.error(error);
    throw new Error("Error checking if user liked pin.");
  }
}
