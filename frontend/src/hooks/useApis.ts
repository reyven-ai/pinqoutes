import { useMutation } from "react-query";

const apiUrl = import.meta.env.VITE_API_URL;

export function useSignUp() {
  return useMutation(async (userData) => {
    const response = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return response.json();
    } else if (response.status === 409) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    } else {
      throw new Error("Sign up failed");
    }
  });
}

export function useLogin() {
  return useMutation(async (userData) => {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    } else {
      throw new Error("Login failed");
    }
  });
}
