import axios from "axios";
import authHeader from "./auth.header";
import { UserProfileData, UserProfileInput } from "@/types/profile.types";
import { ProfileApiData } from "@/types/profile.types";
import { countryCodes } from "@/constants/countryCodes";

const profileUrl = import.meta.env.VITE_API_PROFILE;

export const createProfile = (createProfileInput: UserProfileInput) => {
  const headers = authHeader();
  const formData = new FormData();

  formData.append("filename", createProfileInput.profile_picture_url);
  formData.append("username", createProfileInput.username);
  formData.append("description", createProfileInput.description);
  formData.append(
    "country_of_residence",
    createProfileInput.country_of_residence
  );
  formData.append(
    "mobile_phone_number",
    createProfileInput.mobile_phone_number
  );
  formData.append("birthdate", createProfileInput.birthdate);

  return axios.post(profileUrl, formData, { headers });
};

export const updateProfile = (updateProfileInput: UserProfileInput) => {
  const headers = authHeader();
  const formData = new FormData();

  formData.append("filename", updateProfileInput.profile_picture_url);

  formData.append("username", updateProfileInput.username);
  formData.append("description", updateProfileInput.description);
  formData.append(
    "country_of_residence",
    updateProfileInput.country_of_residence
  );
  formData.append(
    "mobile_phone_number",
    updateProfileInput.mobile_phone_number
  );
  formData.append("birthdate", updateProfileInput.birthdate);
  return axios.patch(profileUrl, formData, { headers });
};

export const getProfileProps = async (): Promise<UserProfileData> => {
  const userId = localStorage.getItem("user_id");
  const headers = authHeader();
  if (!userId) {
    throw new Error("User ID not found in local storage");
  }
  const response = await axios.get(`${profileUrl}${userId}`, { headers });
  return response.data;
};

export const getSelfProfile = async (
  userId: number
): Promise<UserProfileData> => {
  const headers = authHeader();

  const response = await axios.get(`${profileUrl}${userId}`, { headers });
  const userProfileData = transformProfileApiDataToUserProfileData(
    response.data
  );
  console.log("getSelfProfile result:", userProfileData);

  return userProfileData;
};

export const getAllUserProfiles = async (): Promise<UserProfileData[]> => {
  const headers = authHeader();
  const response = await axios.get(profileUrl, { headers });
  return response.data;
};

export const deleteProfile = () => {
  const headers = authHeader();
  return axios.delete(profileUrl, { headers });
};

function splitPhoneNumber(fullNumber: string): [string, string] {
  for (const countryCode of countryCodes) {
    const isMatch = countryCode.phonePattern.test(fullNumber);

    if (isMatch) {
      const prefixLength = countryCode.code.length;
      const extractedPrefix = fullNumber.substring(0, prefixLength);
      const remainingNumber = fullNumber.substring(prefixLength);
      return [extractedPrefix, remainingNumber];
    }
  }

  return ["", fullNumber];
}

function splitBirthdate(fullBirthdate: string): [string, string, string] {
  const [day, month, year] = fullBirthdate.split("-");
  return [day, month, year];
}

function transformProfileApiDataToUserProfileData(
  apiData: ProfileApiData
): UserProfileData {
  const splitMobilePhoneNumber = splitPhoneNumber(apiData.mobile_phone_number);
  const splitBirthdateFormat = splitBirthdate(apiData.birthdate);

  return {
    profile_picture_url: apiData.profile_picture_url,
    username: apiData.username,
    profileId: apiData.profileId,
    userId: apiData.userId,
    description: apiData.description,
    country_of_residence: apiData.country_of_residence,
    mobile_phone_number_prefix: splitMobilePhoneNumber[0],
    mobile_phone_number: splitMobilePhoneNumber[1],
    birth_year: splitBirthdateFormat[0],
    birth_month: splitBirthdateFormat[1],
    birth_day: splitBirthdateFormat[2],
  };
}
