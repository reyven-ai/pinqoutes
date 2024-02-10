import * as Yup from "yup";

// The reason I dind't add any validation is because when ever the user is put some unacceptable file or size and trying to sudmit it they will get error from backend valdation and the error will be displayed on the screen

export const pinValidationSchema = Yup.object().shape({
  //   image_url: Yup.mixed<File>()
  //     .required("A file is required")
  //     .test("fileSize", "File too large", (value: File | null) => {
  //       return value ? value.size <= 1024 * 1024 * 10 : false; // 10 MB
  //     })
  //     .test("fileFormat", "Unsupported Format", (value: File | null) => {
  //       return value ? [".jpg", ".jpeg", ".png"].includes(value.type) : false;
  //     }),
});
