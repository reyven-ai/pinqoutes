import { FormikConfig } from "formik";
import * as Yup from "yup";

export type ListPinsData = {
  title: string;
  description: string;
  link: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
};

export type PinDetails = {
  id: string;
  profileId: string;
  user_id: string;
  title: string;
  description: string;
  link: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
};

export type CreatePinInput = {
  title: string;
  description: string;
  link: string;
  image_url: string;
};

export type UpdatePinInput = {
  title: string;
  description: string;
  link: string;
  image_url: string;
};

export type PinFormInput = {
  title: string;
  description: string;
  link: string;
  image_url: string;
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
  image_url: string;
  created_by: string;
}

export interface SavedDetails {
  pin_id: string;
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_by: string;
}
