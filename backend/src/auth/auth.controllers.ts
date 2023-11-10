import jwt from "jsonwebtoken";
import { config } from "../config";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import {
  UserService,
  EmailFormatError,
  PasswordRequirementsError,
  UserAlreadyRegisteredError,
} from "./auth.services";

const userService = new UserService();

const signup: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user_id = await userService.signup(email, password);
    res
      .status(201)
      .json({ user_id, message: "Signup and profile creation successful" });
  } catch (error) {
    if (
      error instanceof EmailFormatError ||
      error instanceof PasswordRequirementsError
    ) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof UserAlreadyRegisteredError) {
      res.status(409).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      config.jwtSecret
    );

    res.status(200).json({ token, userId: user.user_id });
  } catch (error) {
    next(error);
  }
};

export { signup, login };
