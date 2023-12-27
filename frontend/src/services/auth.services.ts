import { AuthUserDataNeed } from "@/types/user.types";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_AUTH;

export const register = async (authUserdata: AuthUserDataNeed) => {
  const response = await axios.post(apiUrl + "signup", authUserdata);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
};

export const login = async (authUserdata: AuthUserDataNeed) => {
  const response = await axios.post(apiUrl + "login", authUserdata);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};
