import { ReactNode } from "react";

export type AuthUser = {
  email: string;
  password: string;
};

export type UserProfileInput = {
  username: string;
  description: string;
  country_of_residence: string;
  birthdate: string;
  mobile_phone_number: string;
};

export interface UserProfileData {
  profile_id: number;
  user_id: number;
  username: string;
  description: string;
  country_of_residence: string;
  mobile_phone_number: string;
  birthdate: string;
}

export type ErrorResponse = {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
};

export interface RootLayoutProps {
  children: ReactNode;
}
