import { countryCodes } from "../../constants/countryCodes.constants";

export function isValidProfilePic(profilePictureUrl: string) {
  if (!profilePictureUrl.trim()) return true;
}

export function isValidUsername(username: string) {
  if (!username.trim()) return true;

  const regex = /^[a-zA-Z0-9\s-]{3,40}$/;
  return regex.test(username);
}

export function isValidUserAddress(address: string) {
  if (!address.trim()) return true;

  const regex = /^[A-Za-z\s]+,\s[A-Za-z\s]+$/;
  return regex.test(address);
}

export function isValidUserBirthday(birthday: string) {
  if (!birthday.trim()) return true;

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(birthday);
}

export function isValidUserMobileNumber(userMobileNumber: string) {
  if (!userMobileNumber.trim()) return true;

  const genericPattern = /^[a-zA-Z0-9-]{3,16}$/;

  for (const country of countryCodes) {
    if (country.phonePattern && country.phonePattern.test(userMobileNumber)) {
      return true;
    }
  }

  return genericPattern.test(userMobileNumber);
}
