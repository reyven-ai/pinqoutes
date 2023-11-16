import { sign, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import { NotAuthError } from "../errors/errors";
import { Request, Response, NextFunction } from "express";
import { config } from "../config";

interface TokenPayload {
  email: string;
}

interface ExtendedRequest<T> extends Request {
  token?: T;
}

const KEY: string = config.JWT_SECRET;

function createJSONToken(email: string): string {
  return sign({ email }, KEY, { expiresIn: "1h" });
}

function validateJSONToken(token: string): TokenPayload {
  try {
    return verify(token, KEY) as TokenPayload;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw new NotAuthError("Not authenticated.");
  }
}

function isValidPassword(
  password: string,
  storedPassword: string
): Promise<boolean> {
  return compare(password, storedPassword);
}

function checkAuthMiddleware(
  // req: Request,
  req: ExtendedRequest<TokenPayload>,
  res: Response,
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
    const validatedToken: TokenPayload = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.error("NOT AUTH. TOKEN INVALID:", (error as Error).message);
    return next(new NotAuthError("Not authenticated."));
  }
  next();
}

export {
  createJSONToken,
  validateJSONToken,
  isValidPassword,
  checkAuthMiddleware,
};

// exports.createJSONToken = createJSONToken;
// exports.validateJSONToken = validateJSONToken;
// exports.isValidPassword = isValidPassword;
// exports.checkAuth = checkAuthMiddleware;

// import jwt from "jsonwebtoken";
// import { config } from "../config";
// import bcrypt from "bcrypt";
// import { RequestHandler } from "express";
// import {
//   UserService,
//   EmailFormatError,
//   PasswordRequirementsError,
//   UserAlreadyRegisteredError,
// } from "./auth.services";

// const userService = new UserService();

// export const signup: RequestHandler = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user_id = await userService.signup(email, password);
//     res
//       .status(201)
//       .json({ user_id, message: "Signup and profile creation successful" });
//   } catch (error) {
//     if (
//       error instanceof EmailFormatError ||
//       error instanceof PasswordRequirementsError
//     ) {
//       res.status(400).json({ message: error.message });
//     } else if (error instanceof UserAlreadyRegisteredError) {
//       res.status(409).json({ message: error.message });
//     } else {
//       next(error);
//     }
//   }
// };

// export const login: RequestHandler = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userService.getByEmail(email);

//     if (!user) {
//       return res.status(401).json({ message: "Email not found" });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: "Incorrect password" });
//     }

//     const token = jwt.sign(
//       { userId: user.user_id, email: user.email },
//       config.jwtSecret
//     );

//     res.status(200).json({ token, userId: user.user_id });
//   } catch (error) {
//     next(error);
//   }
// };
