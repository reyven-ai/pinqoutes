import validator from "validator";
import { NotAuthError } from "../errors/errors";
import { Request, Response, NextFunction } from "express";
import { config } from "../config";
import { sign, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import { UserAuthToken } from "./auth.types";
import { AuthResponse, TokenPayload } from "../types";

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

export function createJSONToken(user: UserAuthToken): string {
  console.log("<<<<< UserID", user);
  return sign({ email: user.email, user_id: user.user_id }, KEY, {
    expiresIn: "1h",
  });
}

export function validateJSONToken(token: string): TokenPayload {
  try {
    return verify(token, KEY) as TokenPayload;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw new NotAuthError("Not authenticated.");
  }
}

export function isValidPassword(
  password: string,
  storedPassword: string
): Promise<boolean> {
  return compare(password, storedPassword);
}

export function checkAuthMiddleware(
  req: Request,
  res: AuthResponse,
  next: NextFunction
): void {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    console.error("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authFragments: string[] = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    console.error("NOT AUTH. AUTH HEADER INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authToken: string = authFragments[1];
  try {
    const validatedTokenPayload: TokenPayload = validateJSONToken(authToken);

    console.log(">>>> validatedToken:", validatedTokenPayload);

    res.locals = {
      authUser: validatedTokenPayload,
    };
  } catch (error) {
    console.error("NOT AUTH. TOKEN INVALID:", (error as Error).message);
    return next(new NotAuthError("Not authenticated."));
  }
  next();
}
