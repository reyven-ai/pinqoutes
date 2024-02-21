import * as Yup from "yup";

export const pinValidationSchema = Yup.object().shape({
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
});
