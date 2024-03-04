/* eslint-disable @typescript-eslint/no-explicit-any */
import { validCountries } from "@/constants/country";
import * as Yup from "yup";
import { countryCodes } from "@/constants/countryCodes";

export const profileValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "The username must be at least 3 characters.")
    .max(40, "The username must be at most 40 characters.")
    .test((val: any, context: any) => {
      if (context.parent.requiredFields?.includes("username")) {
        return val && val.toString().trim().length > 0;
      } else {
        return true;
      }
    }),
  description: Yup.string()
    .min(3, "The description must be at least 3 characters.")
    .max(40, "The description must be at most 40 characters.")
    .test((val: any, context: any) => {
      if (context.parent.requiredFields?.includes("description")) {
        return val && val.toString().trim().length > 0;
      } else {
        return true;
      }
    }),
  country_of_residence: Yup.string()
    .oneOf(validCountries, "Please select a valid country.")
    .test((val: any, context: any) => {
      if (context.parent.requiredFields?.includes(" country_of_residence")) {
        val && val.toString().trim().length > 0;
      } else {
        return true;
      }
    }),
  mobile_phone_number: Yup.string()
    .test({
      name: "isValidPhoneNumber",
      message: "Invalid phone number format",
      test: function (value) {
        if (!value) return true;
        const genericPattern = /^[a-zA-Z0-9-]{3,16}$/;

        for (const country of countryCodes) {
          if (country.phonePattern && country.phonePattern.test(value || "")) {
            console.log("Matched country pattern:", country);
            return true;
          }
        }
        return genericPattern.test(value || "");
      },
    })
    .test((val: any, context: any) => {
      if (context.parent.requiredFields?.includes("mobile_phone_number")) {
        val && val.toString().trim().length > 0;
      } else {
        return true;
      }
    }),
});
