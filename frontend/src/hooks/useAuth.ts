import { useMutation } from "react-query";

export function useSignUp() {
  return useMutation(async (userData) => {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      return response.json();
    } else if (response.status === 409) {
      throw new Error("Email is already registered.");
    } else {
      throw new Error("Sign up failed");
    }
  });
}

export function useLoginMutation() {
  return useMutation(async (userData) => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      throw new Error("Invalid credentials");
    } else {
      throw new Error("Login failed");
    }
  });
}
