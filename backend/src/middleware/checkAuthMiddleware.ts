import { AuthResponse, TokenPayload } from "../types";
import { Request, Response, NextFunction } from "express";
import { NotAuthError } from "../errors/errors";
import { validateJSONToken } from "../modules/auth/auth.validation";

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
