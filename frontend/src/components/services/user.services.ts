import axios from "axios";
import authHeader from "./auth.header";

const apiUrl = import.meta.env.VITE_API_USER_PROFILE;
const selfProfileUrl = import.meta.env.VITE_API_SELF_PROFILE;

const USER_PROFILE_URL = apiUrl;

export const createProfile = (
  username: string,
  description: string,
  country_of_residence: string,
  birthdate: string,
  mobile_phone_number: string
) => {
  const headers = authHeader();
  return axios.post(
    USER_PROFILE_URL,
    {
      username,
      description,
      country_of_residence,
      birthdate,
      mobile_phone_number,
    },
    { headers }
  );
};

export const updateProfile = (
  profileId: string,
  username: string,
  description: string,
  country_of_residence: string,
  birthdate: string,
  mobile_phone_number: string
) => {
  const headers = authHeader();
  return axios.put(
    `${USER_PROFILE_URL}/${profileId}`,
    {
      username,
      description,
      country_of_residence,
      birthdate,
      mobile_phone_number,
    },
    { headers }
  );
};

export const getSelfProfile = () => {
  const headers = authHeader();
  return axios.get(selfProfileUrl, { headers });
};

export const getProfile = (profileId: string) => {
  const headers = authHeader();
  return axios.get(`${USER_PROFILE_URL}/${profileId}`, { headers });
};

export const deleteProfile = (profileId: string) => {
  const headers = authHeader();
  return axios.delete(`${USER_PROFILE_URL}/${profileId}`, { headers });
};
