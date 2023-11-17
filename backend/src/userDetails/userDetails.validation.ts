import { countryCodes } from "../models/countryCodes";

function isValidUsername(username: string) {
  const regex = /^[a-zA-Z0-9-]{3,16}$/;
  return regex.test(username);
}

function isValidUserAddress(address: string) {
  const regex = /^[A-Za-z\s]+,\s[A-Za-z\s]+$/;
  return regex.test(address);
}

function isValidUserBirthday(birthday: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(birthday);
}

function isValidUserMobileNumber(userMobileNumber: string) {
  const genericPattern = /^[a-zA-Z0-9-]{3,16}$/;

  for (const country of countryCodes) {
    if (country.phonePattern && country.phonePattern.test(userMobileNumber)) {
      return true;
    }
  }

  return genericPattern.test(userMobileNumber);
}

export {
  isValidUsername,
  isValidUserAddress,
  isValidUserBirthday,
  isValidUserMobileNumber,
};
