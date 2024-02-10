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
}

export interface Pin {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_by: string;
  // Add other properties if needed
}

export interface SavedDetails {
  pin_id: string;
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_by: string;
  // Add other properties if needed
}

export interface Pin {
  id: string;
  // Add other properties of Meal if needed
}

export interface State {
  saves: Pin[];
}

export interface Action {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export interface RootState {
  saves: Pin[];
}
