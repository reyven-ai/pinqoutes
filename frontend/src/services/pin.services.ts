import axios from "axios";
import authHeader from "./auth.header";
import { CreatePinInput, PinDetails, UpdatePinInput } from "@/types/pin.types";

const pinUrl = import.meta.env.VITE_API_PIN;

export const createPin = (createPinInput: CreatePinInput) => {
  const headers = authHeader();

  const formData = new FormData();
  formData.append("filename", createPinInput.file_url);
  formData.append("title", createPinInput.title);
  formData.append("description", createPinInput.description);
  formData.append("link", createPinInput.link);

  return axios.post(pinUrl, formData, { headers });
};

export const updatePin = async (id: string, updatePinInput: UpdatePinInput) => {
  const headers = authHeader();

  const formData = new FormData();
  formData.append("filename", updatePinInput.file_url);
  formData.append("title", updatePinInput.title);
  formData.append("description", updatePinInput.description);
  formData.append("link", updatePinInput.link);

  await axios.patch(`${pinUrl}${id}`, formData, { headers });
};

export const getAllPins = async () => {
  const headers = authHeader();
  const response = await axios.get(pinUrl, { headers });
  return response.data;
};

export const getPinDetails = async (id: string): Promise<PinDetails> => {
  const headers = authHeader();

  try {
    const response = await axios.get(`${pinUrl}${id}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching pin details:", error);
    throw error;
  }
};

export const deletePin = async (id: string): Promise<void> => {
  const headers = authHeader();

  try {
    await axios.delete(`${pinUrl}${id}`, {
      headers,
    });
  } catch (error) {
    console.error("Error deleting pin:", error);
    throw error;
  }
};
