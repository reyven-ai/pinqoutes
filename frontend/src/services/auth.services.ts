import { UserAuthInput } from "@/types/user.types";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_AUTH;

export const register = async (authUserdata: UserAuthInput) => {
  const response = await axios.post(apiUrl + "signup", authUserdata);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
};

export const login = async (authUserdata: UserAuthInput) => {
  try {
    const response = await axios.post(apiUrl + "login", authUserdata);
    const { token, user_id } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);
    }

    return { token, user_id };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
