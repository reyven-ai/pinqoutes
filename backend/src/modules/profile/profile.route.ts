import { Router, Request, Response } from "express";

import { add, getSelfProfile, remove, update } from "./profile.services";
import {
  isValidUserAddress,
  isValidUserBirthday,
  isValidUserMobileNumber,
  isValidUsername,
} from "./profile.validation";

import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import { handleError } from "../../errors/errors";
import { AuthResponse } from "../../types";

const router = Router();

router.post(
  "/profile",
  checkAuthMiddleware,
  async (req: Request, res: AuthResponse) => {
    try {
      const {
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      } = req.body;

      const user_id = res.locals.authUser.user_id;

      console.log(">>> Req User ID:", user_id);

      let errors: { [key: string]: string } = {};

      if (!isValidUsername(username)) {
        errors.username = "Invalid username.";
      }

      if (!isValidUserAddress(country_of_residence)) {
        errors.country_of_residence = "Invalid address.";
      }

      if (!isValidUserBirthday(birthdate)) {
        errors.birthdate = "Invalid birthdate";
      }

      if (!isValidUserMobileNumber(mobile_phone_number)) {
        errors.mobile_phone_number = "Invalid number.";
      }

      if (Object.keys(errors).length > 0) {
        return res.status(422).json({
          message: "Creating profile details failed due to validation errors.",
          errors,
        });
      }

      const data = {
        user_id,
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      };

      const createdUser = await add(data);

      res.status(201).json({
        message: "User profile created successfully.",
        userDetails: createdUser,
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.patch(
  "/profile",
  checkAuthMiddleware,
  async (req: Request, res: AuthResponse) => {
    try {
      const user_id = res.locals.authUser.user_id;

      console.log(">>> Profile updated route, userId:", user_id);

      const {
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      } = req.body;

      let errors: { [key: string]: string } = {};

      if (!isValidUsername(username)) {
        errors.username = "Invalid username.";
      }

      if (!isValidUserAddress(country_of_residence)) {
        errors.country_of_residence = "Invalid address.";
      }

      if (!isValidUserBirthday(birthdate)) {
        errors.birthdate = "Invalid birthdate";
      }

      if (!isValidUserMobileNumber(mobile_phone_number)) {
        errors.mobile_phone_number = "Invalid number.";
      }

      if (Object.keys(errors).length > 0) {
        return res.status(422).json({
          message: "Updating profile details failed due to validation errors.",
          errors,
        });
      }

      const data = {
        user_id,
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      };

      const updatedUser = await update(user_id, data);

      if (!updatedUser) {
        return res.status(404).json({ message: "User profile not found" });
      }

      res.status(200).json({
        message: "User profile updated successfully.",
        userDetails: updatedUser,
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get(
  "/profile",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = res.locals.authUser.user_id;
      const userProfile = await getSelfProfile(userId);

      if (!userProfile) {
        return res.status(404).json({ error: "User profile not found" });
      }

      res.status(200).json(userProfile);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.delete(
  "/profile",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = res.locals.authUser.user_id;
      const deletedProfile = await remove(userId);

      if (!deletedProfile) {
        return res.status(404).json({ error: "User profile not found" });
      }

      res.status(200).json({ message: "User profile deleted successfully" });
    } catch (error) {
      handleError(error, res);
    }
  }
);

export default router;
