import axios from 'axios';
import authHeader from './auth.header';
import { UserProfileInput } from '@/types/user.types';

const selfProfileUrl = import.meta.env.VITE_API_SELF_PROFILE;

export const createProfile = (createProfileInput: UserProfileInput) => {
  const headers = authHeader();
  return axios.post(selfProfileUrl, createProfileInput, { headers });
};

export const updateProfile = (
  username: string,
  description: string,
  country_of_residence: string,
  birthdate: string,
  mobile_phone_number: string
) => {
  const headers = authHeader();
  return axios.put(
    selfProfileUrl,
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

export const deleteProfile = () => {
  const headers = authHeader();
  return axios.delete(selfProfileUrl, { headers });
};

// export const getProfile = (profileId: string) => {
//   const headers = authHeader();
//   return axios.get(`${USER_PROFILE_URL}/${profileId}`, { headers });
// };

// export const deleteProfile = (profileId: string) => {
//   const headers = authHeader();
//   return axios.delete(`${USER_PROFILE_URL}/${profileId}`, { headers });
// };
