import { useState } from "react";
import { AuthUser } from "@/types/user.types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { login, register } from "@/components/services/auth.services";

export const useAuth = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();

  const handleRegister = async (formValue: AuthUser) => {
    const { email, password } = formValue;

    setMessage("");
    setSuccessful(true);
    try {
      await register(email, password);
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error: any) {
      handleProfileError(error);
    }
  };

  const handleLogin = async (formValue: AuthUser) => {
    const { email, password } = formValue;

    setMessage("");
    setSuccessful(true);

    try {
      await login(email, password);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error: any) {
      handleProfileError(error);
    }
  };
  const handleProfileError = (error: any) => {
    if (error.response && error.response.status === 422) {
      setMessage("Sorry, that email is already taken.");
    } else if (error.response && error.response.status === 401) {
      setMessage("Sorry, that email or password didn't work.");
    } else {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
    }
    setSuccessful(false);
  };

  return {
    handleRegister,
    handleLogin,
    successful,
    message,
  };
};
