import { FormikConfig } from "formik";

export type CreateComment = {
  comment: string;
};

export type GetCommentsData = {
  pin_id: string;
  id: string;
  user_id: string;
  comment: string;
  created_by: string;
  profile_picture_url: string;
};

export interface CommentFormProps extends FormikConfig<CreateComment> {
  loading: boolean;
  successful: boolean;
  onSubmit: (values: CreateComment) => void;
  initialValues: CreateComment;
  onClose: () => void;
}
