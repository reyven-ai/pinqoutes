import { useMutation } from "react-query";

export function useSignUpMutation() {
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

// import { useMutation } from "react-query";

// export const signUpMutation = useMutation(
//   async (userData: { email: string; password: string }) => {
//     const response = await fetch("http://localhost:3000/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });
//     if (response.ok) {
//       return response.json();
//     } else if (response.status === 409) {
//       throw new Error("Email is already registered.");
//     } else {
//       throw new Error("Sign up failed");
//     }
//   }
// );
