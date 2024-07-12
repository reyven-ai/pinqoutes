import UserFollowsRepository from "./follows.repository";
import { Follow } from "./follows.types";

export async function followOtherUsers(data: Follow): Promise<Follow | null> {
  try {
    const followRepository = new UserFollowsRepository();
    const followUser = await followRepository.followUser(
      data.followerId,
      data.followedId,
      data.created_at
    );

    if (!followUser) {
      return null;
    }

    return followUser;
  } catch (error) {
    console.error(error);
    throw new Error("Error following user.");
  }
}

export async function unfollow(
  followerId: string,
  followedId: string
): Promise<void> {
  try {
    const followRepository = new UserFollowsRepository();
    await followRepository.unfollowUser(followerId, followedId);
  } catch (error) {
    console.error("Error in unfollow:", error);
    throw new Error("Error unfollowing users.");
  }
}

export async function getFollowersCount(followedId: string): Promise<Number> {
  try {
    const followRepository = new UserFollowsRepository();
    const followerCount = await followRepository.countFollowersForUser(
      followedId
    );
    return followerCount;
  } catch (error) {
    console.error("Error fetching followers count:", error);
    throw new Error("Error fetching followers count.");
  }
}

export async function getFollowingCount(followerId: string): Promise<Number> {
  try {
    const followRepository = new UserFollowsRepository();
    const followingCount = await followRepository.countFollowingForUser(
      followerId
    );
    return followingCount;
  } catch (error) {
    console.error("Error fetching following count:", error);
    throw new Error("Error fetching followers count.");
  }
}

export async function hasUserFollowedOtherUser(
  followerId: string,
  followedId: string
): Promise<boolean> {
  try {
    const followRepository = new UserFollowsRepository();
    const hasfollowed = await followRepository.isFollowing(
      followerId,
      followedId
    );
    return hasfollowed;
  } catch (error) {
    console.error(error);
    throw new Error("Error checking if user follow other users.");
  }
}
