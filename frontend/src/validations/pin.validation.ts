/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

export const pinValidationSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, "You have exceeded the maximum character limit of 100")
    .test((val: any, context: any) => {
      if (context.parent.requiredFields?.includes("title")) {
        return val && val.toString().trim().length > 0;
      } else {
        return true;
      }
    }),
  description: Yup.string()
    .max(500, "You have exceeded the maximum character limit of 500.")
    .test((val: any, context: any) => {
      if (context.parent.requiredFields?.includes("description")) {
        return val && val.toString().trim().length > 0;
      } else {
        return true;
      }
    }),
  image_url: Yup.mixed<File>()
    .required("A file is required")
    .test(
      "fileSize",
      "File size exceeds the maximum limit of 10MB.",
      (value: File | null) => {
        return value ? value.size <= 1024 * 1024 * 10 : false;
      }
    )
    .test(
      "fileFormat",
      "Invalid file extension. Allowed extensions are .jpg, .jpeg, .png.",
      (value: File | null) => {
        return value
          ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          : false;
      }
    ),
  link: Yup.string().url(),
});
