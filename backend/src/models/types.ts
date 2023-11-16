export interface UserAuth {
  user_id: number;
  email: string;
  password: string;
}

export interface UserProfile {
  // id: string;
  username: string;
  description: string;
  country_of_residence: string;
  mobile_phone_number: string;
  birthdate: string;
}

export interface updateUserProfile {
  id: string;
  username: string;
  description: string;
  country_of_residence: string;
  mobile_phone_number: string;
  birthdate: string;
}
