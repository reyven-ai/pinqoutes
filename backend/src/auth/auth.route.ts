import { Router, Request, Response } from "express";
import {
  isEmailValidFormat,
  isPasswordValidFormat,
  isValidPassword,
} from "./auth.validation";
import { add, get, createJSONToken } from "./auth.services";
import { InternalServerError } from "../errors/errors";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let errors: { [key: string]: string } = {};

    if (!isEmailValidFormat(email)) {
      errors.email = "Invalid email format.";
    } else {
      try {
        const existingUser = await get(email);
        if (existingUser) {
          errors.email = "Sorry, that email is already taken.";
        }
      } catch (err) {
        console.error("Error checking existing user:", err);
      }
    }

    if (!isPasswordValidFormat(password, 8)) {
      errors.password = "Password must be strong and at least 8 characters.";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "User signup failed due to validation errors.",
        errors,
      });
    }

    const data = { email, password };
    const createdUser = await add(data);

    const authToken = createJSONToken({
      user_id: createdUser.user_id,
      email: createdUser.email,
    });

    res.status(201).json({
      message: "User created successfully.",
      user: createdUser,
      token: authToken,
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    throw new InternalServerError("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;
  try {
    user = await get(email);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(401).json({
      message: "Invalid credentials.",
      errors: { credentials: "Sorry, that email or password didn't work." },
    });
  }
  const authToken = createJSONToken({
    user_id: user.user_id,
    email: user.email,
  });
  console.log("<<< loginUser", user);
  res.json({ token: authToken });
  console.log("<<<Validate:", authToken);
});

export default router;
