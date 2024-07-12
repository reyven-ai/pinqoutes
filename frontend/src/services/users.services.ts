import axios from "axios";
import authHeader from "./auth.header";
import { ListPinsData } from "@/types/pin.types";

const usersPinsUrl = import.meta.env.VITE_API_USERS;

export const getAllUsers = async () => {
  const headers = authHeader();
  const response = await axios.get(usersPinsUrl, { headers });
  return response.data;
};

export const getUserPins = async (userId: string): Promise<ListPinsData> => {
  const headers = authHeader();

  if (!userId) {
    throw new Error("User ID not found in local storage");
  }

  const response = await axios.get(`${usersPinsUrl}${userId}/pins`, {
    headers,
  });

  return response.data;
};

export const saveUserPin = async (
  userId: string,
  pinId: string
): Promise<void> => {
  const headers = authHeader();

  if (!userId || !pinId) {
    throw new Error("User ID or Pin ID is missing");
  }

  await axios.post(`${usersPinsUrl}${userId}/savePin`, { pinId }, { headers });
};

export const removeUserPin = async (
  userId: string,
  pinId: string
): Promise<void> => {
  const headers = authHeader();

  if (!userId || !pinId) {
    throw new Error("User ID or Pin ID is missing");
  }

  await axios.delete(`${usersPinsUrl}${userId}/savedPins/${pinId}`, {
    headers,
  });
};
