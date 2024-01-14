export interface ProfileData {
  id: string;
  user_id: number;
  username: string;
  description: string;
  country_of_residence: string;
  birthdate: string;
  mobile_phone_number: string;
}

export interface CreateProfileInput {
  user_id: number;
  username: string;
  description: string;
  country_of_residence: string;
  birthdate: string;
  mobile_phone_number: string;
}

export interface UpdateProfileInput {
  user_id: number;
  username: string;
  description: string;
  country_of_residence: string;
  birthdate: string;
  mobile_phone_number: string;
}
