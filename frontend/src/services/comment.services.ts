import axios from "axios";
import authHeader from "./auth.header";
import { CreateComment, GetCommentsData } from "@/types/comment.types";

const commentUrl = import.meta.env.VITE_API_COMMENTS;

export const createComment = (
  userId: string,
  pinId: string,
  createComment: CreateComment
) => {
  const headers = authHeader();
  return axios.post(
    `${commentUrl}${userId}/commentPin`,
    { pinId, createComment },
    { headers }
  );
};

export const getCommentsPerPinqoutes = async (
  pinId: string
): Promise<GetCommentsData> => {
  const headers = authHeader();

  if (!pinId) {
    throw new Error("User ID is missing");
  }

  const response = await axios.get(`${commentUrl}${pinId}/comments`, {
    headers,
  });
  return response.data;
};

export const getCommentCountForPin = async (pinId: string): Promise<number> => {
  const headers = authHeader();
  const response = await axios.get(`${commentUrl}${pinId}/commentCount`, {
    headers,
  });
  return response.data.count;
};

export const hasUserCommentPin = async (
  userId: string,
  pinId: string
): Promise<boolean> => {
  const headers = authHeader();
  const response = await axios.get(
    `${commentUrl}${userId}/${pinId}/hasComment`,
    {
      headers,
    }
  );
  return response.data.hasComment;
};

// export const getLikeCountForPin = async (pinId: string): Promise<number> => {
//   const headers = authHeader();
//   const response = await axios.get(`${commentUrl}${pinId}/likeCount`, { headers });
//   return response.data.count;
// };
