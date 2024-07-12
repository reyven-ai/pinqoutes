import { FormikConfig } from "formik";
import * as Yup from "yup";

export type ListPinsData = {
  title: string;
  description: string;
  link: string;
  file_url: string;
  file_type: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  profile_picture_url: string;
};

export type PinDetails = {
  id: string;
  pin_id: string;
  profileId: string;
  user_id: string;
  title: string;
  description: string;
  link: string;
  file_url: string;
  file_type: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  profile_picture_url: string;
};

export type CreatePinInput = {
  title: string;
  description: string;
  link: string;
  file_url: string;
};

export type UpdatePinInput = {
  title: string;
  description: string;
  link: string;
  file_url: string;
};

export type PinFormInput = {
  title: string;
  description: string;
  link: string;
  file_url: string;
};

export interface PinFormProps extends FormikConfig<PinFormInput> {
  loading: boolean;
  title: string;
  onSubmit: (values: PinFormInput) => void;
  validationSchema: Yup.Schema;
  initialValues: PinFormInput;
  message?: string;
  successful?: boolean;
  isNewPin?: boolean;
  onClose: () => void;
}

export interface Pin {
  id: string;
  user_id: string;
  title: string;
  description: string;
  link: string;
  file_url: string;
  file_type: string;
  created_by: string;
  created_at: string;
  profile_picture_url: string;
}

export interface SavedDetails {
  length: number;
  pin_id: string;
  id: string;
  user_id: string;
  title: string;
  description: string;
  file_type: string;
  file_url: string;
  created_by: string;
  profile_picture_url: string;
}
