/* eslint-disable @typescript-eslint/no-explicit-any */
import { validCountries } from "@/constants/country";
import * as Yup from "yup";
import { countryCodes } from "@/constants/countryCodes";

export const profileValidationSchema = Yup.object().shape({
  username: Yup.string()
    .test(
      "len",
      "The username must be between 3 and 15 characters.",
      (val: any) =>
        val && val.toString().length >= 3 && val.toString().length <= 40
    )
    .required("Please, fill this field."),
  description: Yup.string()
    .test(
      "len",
      "The description must be between 3 and 20 characters.",
      (val: any) =>
        val && val.toString().length >= 3 && val.toString().length <= 40
    )
    .required("Please, fill this field."),
  country_of_residence: Yup.string()
    .oneOf(validCountries, "Please select a valid country.")
    .required("Please, select your country of residence."),

  mobile_phone_number: Yup.string()
    .test({
      name: "isValidPhoneNumber",
      message: "Invalid phone number format",
      test: function (value) {
        const genericPattern = /^[a-zA-Z0-9-]{3,16}$/;
        for (const country of countryCodes) {
          if (country.phonePattern && country.phonePattern.test(value || "")) {
            return true;
          }
        }
        return genericPattern.test(value || "");
      },
    })
    .required("Please, fill this field."),
});
