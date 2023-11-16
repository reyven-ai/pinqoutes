import { Router, Request, Response } from "express";
import { isEmailValid, isPasswordValid } from "./auth.validation";
import { createJSONToken, isValidPassword } from "./auth.controllers";
import { add, get } from "./auth.services";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    let errors: { [key: string]: string } = {};

    if (!isEmailValid(email)) {
      errors.email = "Invalid email.";
    } else {
      try {
        const existingUser = await get(email);
        if (existingUser) {
          errors.email = "Email is already taken.";
        }
      } catch (err) {
        console.error("Error checking existing user:", err);
      }
    }

    if (!isPasswordValid(password, 8)) {
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
    const authToken = createJSONToken(createdUser.email);

    // Redirect the user to the desired route after successful signup
    res.status(201).json({
      message: "User created.",
      user: createdUser,
      token: authToken,
      // redirect: "/profile-details", // Replace '/profile' with the actual route
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  const token = createJSONToken(email);
  res.json({ token });
});

export default router;

// import { Router } from "express";

// import { signup, login } from "./auth.controllers";

// const router = Router();

// router.post("/signup", signup);
// router.post("/login", login);
// // router.post("/profile", createProfile);

// auth.js //

// const express = require('express');
// const { add, get } = require('../data/user');
// const { createJSONToken, isValidPassword } = require('../util/auth');
// const { isValidEmail, isValidText } = require('../util/validation');

// const router = express.Router();

// router.post('/signup', async (req, res, next) => {
//   const data = req.body;
//   let errors = {};

//   if (!isValidEmail(data.email)) {
//     errors.email = 'Invalid email.';
//   } else {
//     try {
//       const existingUser = await get(data.email);
//       if (existingUser) {
//         errors.email = 'Email exists already.';
//       }
//     } catch (error) {}
//   }

//   if (!isValidText(data.password, 6)) {
//     errors.password = 'Invalid password. Must be at least 6 characters long.';
//   }

//   if (Object.keys(errors).length > 0) {
//     return res.status(422).json({
//       message: 'User signup failed due to validation errors.',
//       errors,
//     });
//   }

//   try {
//     const createdUser = await add(data);
//     const authToken = createJSONToken(createdUser.email);
//     res
//       .status(201)
//       .json({ message: 'User created.', user: createdUser, token: authToken });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/login', async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   let user;
//   try {
//     user = await get(email);
//   } catch (error) {
//     return res.status(401).json({ message: 'Authentication failed.' });
//   }

//   const pwIsValid = await isValidPassword(password, user.password);
//   if (!pwIsValid) {
//     return res.status(422).json({
//       message: 'Invalid credentials.',
//       errors: { credentials: 'Invalid email or password entered.' },
//     });
//   }

//   const token = createJSONToken(email);
//   res.json({ token });
// });

// module.exports = router;
