import validator from "validator";
import { NotAuthError } from "../../errors/errors";
import { config } from "../../config";
import { verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import { TokenPayload } from "../../types";

const KEY: string = config.JWT_SECRET;

export function isEmailValidFormat(email: string) {
  return validator.isEmail(email);
}

export function isPasswordValidFormat(password: string, minLength: number) {
  if (password.length < minLength) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/\d/.test(password)) {
    return false;
  }
  return true;
}

export function validateJSONToken(token: string): TokenPayload {
  try {
    return verify(token, KEY) as TokenPayload;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw new NotAuthError("User is not authenticated");
  }
}

export function isValidPassword(
  password: string,
  storedPassword: string
): Promise<boolean> {
  return compare(password, storedPassword);
}
