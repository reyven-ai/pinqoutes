import axios from "axios";
import authHeader from "./auth.header";
import { SavedDetails } from "@/types/pin.types";

const saveUrl = import.meta.env.VITE_API_SAVES;

export const savePinqoutes = async (
  userId: string,
  pinId: string
): Promise<void> => {
  const headers = authHeader();

  if (!userId || !pinId) {
    throw new Error("User ID or Pin ID is missing");
  }

  await axios.post(`${saveUrl}${userId}/savePin`, { pinId }, { headers });
};

export const unsavePinqoutes = async (
  userId: string,
  pinId: string
): Promise<void> => {
  const headers = authHeader();

  if (!userId || !pinId) {
    throw new Error("User ID or Pin ID is missing");
  }

  await axios.delete(`${saveUrl}${userId}/savedPins/${pinId}`, {
    headers,
  });
};

export const getSavedPinqoutes = async (
  userId: string
): Promise<SavedDetails> => {
  const headers = authHeader();

  if (!userId) {
    throw new Error("User ID is missing");
  }

  const response = await axios.get(`${saveUrl}${userId}/savedPins`, {
    headers,
  });
  return response.data;
};

export const hasUserSavedPin = async (
  userId: string,
  pinId: string
): Promise<boolean> => {
  const headers = authHeader();
  const response = await axios.get(`${saveUrl}${userId}/${pinId}/hasSaved`, {
    headers,
  });
  return response.data.hasSaved;
};
