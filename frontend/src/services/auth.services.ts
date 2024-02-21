import { UserAuthInput } from "@/types/user.types";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_AUTH;

export const register = async (authUserdata: UserAuthInput) => {
  try {
    const response = await axios.post(apiUrl + "signup", authUserdata);
    console.log(response.data);
    const { token, user } = response.data;
    const { user_id } = user;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);
    }

    return { token, user_id };
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
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
