import axios from "axios";
import authHeader from "./auth.header";
import { LikedDetails } from "@/types/like.types";

const likeUrl = import.meta.env.VITE_API_LIKES;

export const likePinqoutes = async (
  userId: string,
  pinId: string
): Promise<void> => {
  const headers = authHeader();

  if (!userId || !pinId) {
    throw new Error("User ID or Pin ID is missing");
  }

  await axios.post(`${likeUrl}${userId}/likedPin`, { pinId }, { headers });
};

export const unlikePinqoutes = async (
  userId: string,
  pinId: string
): Promise<void> => {
  const headers = authHeader();

  if (!userId || !pinId) {
    throw new Error("User ID or Pin ID is missing");
  }

  await axios.delete(`${likeUrl}${userId}/unliked/${pinId}`, {
    headers,
  });
};

export const getLikedPinqoutes = async (
  userId: string
): Promise<LikedDetails> => {
  const headers = authHeader();

  if (!userId) {
    throw new Error("User ID is missing");
  }

  const response = await axios.get(`${likeUrl}${userId}/likedPinqoutes`, {
    headers,
  });
  return response.data;
};

export const getLikeCountForPin = async (pinId: string): Promise<number> => {
  const headers = authHeader();
  const response = await axios.get(`${likeUrl}${pinId}/likeCount`, { headers });
  return response.data.count;
};

export const hasUserLikedPin = async (
  userId: string,
  pinId: string
): Promise<boolean> => {
  const headers = authHeader();
  const response = await axios.get(`${likeUrl}${userId}/${pinId}/hasLiked`, {
    headers,
  });
  return response.data.hasLiked;
};
