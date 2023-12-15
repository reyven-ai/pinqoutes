import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please, enter a valid email.")
    .required("Please, fill this field."),
  password: Yup.string()
    .test(
      "len",
      "The password must be strong and between 8 and 40 characters.",
      (val: any) =>
        val && val.toString().length >= 8 && val.toString().length <= 20
    )
    .required("Please, fill this field."),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Please, fill this field."),
  password: Yup.string().required("Please, fill this field."),
});
