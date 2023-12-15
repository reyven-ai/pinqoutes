import axios from "axios";

const apiUrl = import.meta.env.VITE_API_AUTH;

export const register = async (email: string, password: string) => {
  const response = await axios.post(apiUrl + "signup", {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(apiUrl + "login", {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const logout = () => {
  const removedToken = localStorage.removeItem("token");
  return removedToken;
};

export const getCurrentToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return token;
};

export function checkAuthLoader() {
  const token = getCurrentToken();
  return token;
}
