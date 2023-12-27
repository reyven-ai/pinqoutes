import { ReactNode } from "react";
import * as Yup from "yup";

export type AuthUserDataNeed = {
  email: string;
  password: string;
};

export type AuthUserFormInput = {
  email: string;
  password: string;
};

// type for auth form props
export interface AuthFormProps {
  title: string;
  linkText: string;
  linkTo: string;
  labelLink: string;
  onSubmit: (values: AuthUserFormInput) => void;
  validationSchema: Yup.Schema<AuthUserFormInput>;
  initialValues: AuthUserFormInput;
  message?: string;
  successful?: boolean;
}

export type RootLayoutProps = {
  children: ReactNode;
};

export type RootLayoutjProps = {
  childeen: ReactNode;
};
