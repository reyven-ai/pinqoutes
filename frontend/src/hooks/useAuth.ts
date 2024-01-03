import { useState } from "react";
import { UserAuthInput, AuthUserFormInput } from "@/types/user.types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { login, register } from "@/services/auth.services";
import { ErrorResponse } from "@/types/errors.types";

export const useAuth = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate: NavigateFunction = useNavigate();

  const handleRegister = async (formValue: AuthUserFormInput) => {
    const { email, password } = formValue;

    const userToRegister: UserAuthInput = {
      email,
      password,
    };

    setMessage("");
    setSuccessful(true);
    setLoading(true);

    try {
      await register(userToRegister);
      navigate("/profile/create");
    } catch (error) {
      handleProfileError(error as ErrorResponse);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (formValue: AuthUserFormInput) => {
    const { email, password } = formValue;

    const userToRegister: UserAuthInput = {
      email,
      password,
    };

    setMessage("");
    setSuccessful(true);
    setLoading(true);

    try {
      await login(userToRegister);
      navigate("/");
    } catch (error) {
      handleProfileError(error as ErrorResponse);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileError = (error: ErrorResponse) => {
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
    loading,
  };
};
