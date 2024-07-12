import { PinData } from "../pin/pin.types";
import { UserCommentsRepository } from "./comment.repository";
import { Comments, CommentsData } from "./comment.types";

export async function commentPinqoutes(
  data: Comments
): Promise<Comments | null> {
  try {
    const commentRepository = new UserCommentsRepository();
    const commentPin = await commentRepository.createComment(
      data.userId,
      data.pinId,
      data.comment,
      data.created_at
    );

    return commentPin;
  } catch (error) {
    console.error("Error commenting pinqoutes:", error);
    throw new Error("Error commenting pinqoutes.");
  }
}

export async function getcommentPinqoutes(
  pinId: string
): Promise<CommentsData[]> {
  try {
    const commentRepository = new UserCommentsRepository();
    const commentPinqoutes = await commentRepository.getComment(pinId);
    return commentPinqoutes;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching comment pinqoutes.");
  }
}

export async function getCommentCount(pinId: string): Promise<number> {
  try {
    const commentRepository = new UserCommentsRepository();
    const commentCount = await commentRepository.countCommentsForPin(pinId);
    return commentCount;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching comments count.");
  }
}

export async function hasUserCommentPin(
  userId: string,
  pinId: string
): Promise<boolean> {
  try {
    const commentRepository = new UserCommentsRepository();
    const hasComment = await commentRepository.hasUserCommentPin(userId, pinId);
    return hasComment;
  } catch (error) {
    console.error(error);
    throw new Error("Error checking if user comment pin.");
  }
}
