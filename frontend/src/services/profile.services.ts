import axios from "axios";
import authHeader from "./auth.header";
import { UserProfileData, UserProfileInput } from "@/types/profile.types";
import { ProfileApiData } from "@/types/profile.types";
import { countryCodes } from "@/constants/countryCodes";

const profileUrl = import.meta.env.VITE_API_PROFILE;

export const createProfile = (createProfileInput: UserProfileInput) => {
  const headers = authHeader();
  return axios.post(profileUrl, createProfileInput, { headers });
};

export const updateProfile = (updateProfileInput: UserProfileInput) => {
  const headers = authHeader();
  return axios.patch(profileUrl, updateProfileInput, { headers });
};

export const getSelfProfile: () => Promise<UserProfileData> = async () => {
  const headers = authHeader();

  const response = await axios.get(profileUrl, { headers });
  const userProfileData = transformProfileApiDataToUserProfileData(
    response.data
  );

  console.log("getSelfProfile result:", userProfileData);

  return userProfileData;
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
    username: apiData.username,
    profile_id: apiData.profile_id,
    user_id: apiData.user_id,
    description: apiData.description,
    country_of_residence: apiData.country_of_residence,
    mobile_phone_number_prefix: splitMobilePhoneNumber[0],
    mobile_phone_number: splitMobilePhoneNumber[1],
    birth_year: splitBirthdateFormat[0],
    birth_month: splitBirthdateFormat[1],
    birth_day: splitBirthdateFormat[2],
  };
}
