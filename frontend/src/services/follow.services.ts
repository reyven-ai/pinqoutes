import axios from "axios";
import authHeader from "./auth.header";

const followUrl = import.meta.env.VITE_API_FOLLOWS;

export const followOtherUsers = async (
  userId: string,
  followedId: Number | string
): Promise<void> => {
  const headers = authHeader();

  if (!userId || !followedId) {
    throw new Error("User ID or Followed ID is missing");
  }

  try {
    await axios.post(
      `${followUrl}${followedId}/follow`,
      { followerId: userId, followedId },
      { headers }
    );
  } catch (error) {
    console.error("Error following user:", error);
    throw new Error("Error following user");
  }
};

export const unfollowOtherUsers = async (
  userId: string,
  followedId: string
): Promise<void> => {
  const headers = authHeader();

  if (!userId || !followedId) {
    throw new Error("User ID or Followed ID is missing");
  }

  try {
    await axios.delete(`${followUrl}${followedId}/unfollow`, { headers });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw new Error("Error unfollowing user");
  }
};

export const getFollowersCountForUser = async (
  followedId: string
): Promise<number> => {
  const headers = authHeader();
  try {
    const response = await axios.get(`${followUrl}${followedId}/followers`, {
      headers,
    });
    return response.data.count;
  } catch (error) {
    console.error("Error getting followers count:", error);
    throw new Error("Error getting followers count");
  }
};

export const getFollowingCountForUser = async (
  followerId: string
): Promise<number> => {
  const headers = authHeader();
  try {
    const response = await axios.get(`${followUrl}${followerId}/following`, {
      headers,
    });
    return response.data.count;
  } catch (error) {
    console.error("Error getting following count:", error);
    throw new Error("Error getting following count");
  }
};

export const hasUserFollowingOther = async (
  followerId: string,
  followedId: string
): Promise<boolean> => {
  const headers = authHeader();
  const response = await axios.get(
    `${followUrl}${followerId}/isFollowing/${followedId}`,
    {
      headers,
    }
  );
  return response.data.hasLiked;
};
