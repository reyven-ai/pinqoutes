import { UserProfileData, UserProfileInput } from "@/types/profile.types";

import { NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createProfile,
  deleteProfile,
  getSelfProfile,
  updateProfile,
} from "@/services/profile.services";
import { ProfileFormInput } from "@/types/profile.types";
import { ErrorResponse } from "@/types/errors.types";

export const useProfileAction = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate: NavigateFunction = useNavigate();

  const handleCreateProfile = async (formValue: ProfileFormInput) => {
    const {
      username,
      description,
      country_of_residence,
      birth_day,
      birth_month,
      birth_year,
      mobile_phone_number,
      mobile_phone_number_prefix,
    } = formValue;

    const fullPhoneNumber = mobile_phone_number_prefix + mobile_phone_number;
    const birthdate = `${birth_year}-${birth_month}-${birth_day}`;

    const profileToCreate: UserProfileInput = {
      username,
      description,
      country_of_residence,
      birthdate,
      mobile_phone_number: fullPhoneNumber,
    };

    setMessage("");
    setSuccessful(true);
    setLoading(true);

    try {
      await createProfile(profileToCreate);
      navigate("/");
    } catch (error) {
      handleProfileError(error as ErrorResponse);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async (formValue: ProfileFormInput) => {
    const {
      username,
      description,
      country_of_residence,
      birth_day,
      birth_month,
      birth_year,
      mobile_phone_number,
      mobile_phone_number_prefix,
    } = formValue;

    const fullPhoneNumber = mobile_phone_number_prefix + mobile_phone_number;
    const birthdate = `${birth_year}-${birth_month}-${birth_day}`;

    const profileToUpdate: UserProfileInput = {
      username,
      description,
      country_of_residence,
      birthdate,
      mobile_phone_number: fullPhoneNumber,
    };

    setMessage("");
    setSuccessful(true);
    setLoading(true);

    try {
      await updateProfile(profileToUpdate);
      navigate("/profile");
      window.location.reload();
    } catch (error) {
      handleProfileError(error as ErrorResponse);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteProfile = async () => {
    setMessage("");
    setSuccessful(true);
    try {
      await deleteProfile();
      navigate("/signup");
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
    loading,
    handleCreateProfile,
    handleDeleteProfile,
    handleEditProfile,
  };
};

function transformProfileDataToInput(
  userProfileData: UserProfileData
): ProfileFormInput {
  return {
    username: userProfileData.username,
    description: userProfileData.description,
    country_of_residence: userProfileData.country_of_residence,
    mobile_phone_number_prefix: userProfileData.mobile_phone_number_prefix,
    mobile_phone_number: userProfileData.mobile_phone_number,
    birth_day: userProfileData.birth_day,
    birth_month: userProfileData.birth_month,
    birth_year: userProfileData.birth_year,
  };
}

export const useGetProfileData = () => {
  const [userProfile, setUserProfile] = useState<ProfileFormInput | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const selfProfile = await getSelfProfile();
        const userProfile = transformProfileDataToInput(selfProfile);
        setUserProfile(userProfile || null);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  return {
    userProfile,
  };
};
