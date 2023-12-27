import * as Yup from "yup";

// This type, ProfileFormInput, represents the structure of an object that might be used in a form for inputting user profile data. Each property in this type corresponds to a field in a form, and its type annotation (string in this case) indicates the expected data type for that field.
export type ProfileFormInput = {
  username: string;
  description: string;
  country_of_residence: string;
  mobile_phone_number: string;
  mobile_phone_number_prefix: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
};

// This type, ProfileApiData, represents the structure of data received from an API endpoint related to user profiles. Each property in this type corresponds to a piece of information about a user profile retrieved from the API:
export type ProfileApiData = {
  birthdate: string;
  country_of_residence: string;
  mobile_phone_number: string;
  profile_id: number;
  user_id: number;
  username: string;
  description: string;
};

export interface ProfileFormProps {
  title: string;
  onSubmit: (values: ProfileFormInput) => void;
  validationSchema: Yup.Schema<UserProfileTemporary>;
  initialValues: ProfileFormInput;
  message?: string;
  successful?: boolean;
}

// type for data need
export type UserProfileDataNeed = {
  username: string;
  description: string;
  country_of_residence: string;
  birthdate: string;
  mobile_phone_number: string;
};

export type UserProfileTemporary = {
  username: string;
  description: string;
  country_of_residence: string;
  // birthdate: string;
  mobile_phone_number: string;
};

// type for need to get
export type UserProfileData = {
  profile_id: number;
  user_id: number;
  username: string;
  description: string;
  country_of_residence: string;
  mobile_phone_number_prefix: string;
  mobile_phone_number: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
};
