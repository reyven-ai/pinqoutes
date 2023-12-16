import { validCountries } from "@/constants/country";
import { validMonths } from "@/constants/month";
import * as Yup from "yup";
import { countryCodes } from "@/constants/countryCodes";

export const profileValidationSchema = Yup.object().shape({
  username: Yup.string()
    .test(
      "len",
      "The username must be between 3 and 15 characters.",
      (val: any) =>
        val && val.toString().length >= 3 && val.toString().length <= 20
    )
    .required("Please, fill this field."),
  description: Yup.string()
    .test(
      "len",
      "The description must be between 3 and 20 characters.",
      (val: any) =>
        val && val.toString().length >= 3 && val.toString().length <= 20
    )
    .required("Please, fill this field."),
  country_of_residence: Yup.string()
    .oneOf(validCountries, "Please select a valid country.")
    .required("Please, select your country of residence."),

  // birthdate: Yup.object()
  //   .shape({
  //     birthDay: Yup.string().required("Please select a valid day."),
  //     birthMonth: Yup.string()
  //       .oneOf(validMonths, "Please select a valid month.")
  //       .required("Please select a valid month."),
  //     birthYear: Yup.string().required("Please select a valid year."),
  //   })
  //   .test("isValidDate", "Invalid date", function (value) {
  //     const { birthDay, birthMonth, birthYear } = value;
  //     return birthDay && birthMonth && birthYear;
  //   }),

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
