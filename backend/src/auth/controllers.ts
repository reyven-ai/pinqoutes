import { RequestHandler } from "express";
import pool from "../database/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const isEmailValid = (email: string): boolean => {
  return email.endsWith("@gmail.com");
};

const isPasswordValid = (password: string): boolean => {
  return password.length >= 8;
};

const signup: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!isEmailValid(email)) {
      return res.status(400).json({ message: "Invalid format" });
    }

    if (!isPasswordValid(password)) {
      return res
        .status(400)
        .json({ message: "Password does not meet requirements" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rowCount > 0) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id",
      [email, hashedPassword]
    );

    const user_id = result.rows[0].user_id;

    res
      .status(201)
      .json({ user_id, message: "Signup and profile creation successful" });
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rowCount === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.rows[0].id }, "your-secret-key");

    res.json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

export { signup, login };
