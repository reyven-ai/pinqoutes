import { ErrorResponse, UserProfileInput } from "@/types/user.types";

import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createProfile } from "@/components/services/user.services";

export const useCreateProfile = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();

  const handleCreateProfile = async (formValue: UserProfileInput) => {
    console.log("handleCreateProfile", formValue);
    const {
      username,
      description,
      country_of_residence,
      birthdate,
      mobile_phone_number,
    } = formValue;

    setMessage("");
    setSuccessful(true);
    try {
      await createProfile(
        username,
        description,
        country_of_residence,
        birthdate,
        mobile_phone_number
      );
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      handleProfileError(error as ErrorResponse);
    }
  };

  const handleProfileError = (error: ErrorResponse) => {
    if (error.response && error.response.status === 401) {
      setMessage("Sorry, You're not authenticated.");
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
    successful,
    message,
    handleCreateProfile,
  };
};
