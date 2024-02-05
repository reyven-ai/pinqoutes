import axios from "axios";
import authHeader from "./auth.header";
import { ListPinsData } from "@/types/pin.types";

const usersPinsUrl = import.meta.env.VITE_API_USERS;

export const getAllUsers = async () => {
  const headers = authHeader();
  const response = await axios.get(usersPinsUrl, { headers });
  return response.data;
};

export const getUserPins = async (): Promise<ListPinsData> => {
  const userId = localStorage.getItem("user_id");
  const headers = authHeader();

  if (!userId) {
    throw new Error("User ID not found in local storage");
  }

  const response = await axios.get(`${usersPinsUrl}${userId}/pins`, {
    headers,
  });

  return response.data;
};
