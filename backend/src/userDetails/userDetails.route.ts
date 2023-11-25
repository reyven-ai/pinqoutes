import { Router, Request, Response } from "express";
import {
  isValidUsername,
  isValidUserAddress,
  isValidUserBirthday,
  isValidUserMobileNumber,
} from "./userDetails.validation";
import { add, update, get, remove } from "./userDetails.services";
import { handleError } from "../errors/errors";
import { checkAuthMiddleware } from "../auth/auth.validation";
import { AuthResponse } from "../types";

const router = Router();

router.post(
  "/",
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
  "/:profileId",
  checkAuthMiddleware,
  async (req: Request, res: AuthResponse) => {
    try {
      const profileId = req.params.profileId;
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

      const updatedUser = await update(user_id, profileId, data);

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
  "/:profileId",
  checkAuthMiddleware,
  async (req: Request<{ profileId: string }, {}, {}>, res: Response) => {
    try {
      const profileId = req.params.profileId;

      const userProfile = await get(profileId);

      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      res.status(200).json({ userProfile });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.delete(
  "/:profileId",
  checkAuthMiddleware,
  async (req: Request, res: AuthResponse) => {
    try {
      const profileId = req.params.profileId;
      const { user_id } = res.locals.authUser;

      console.log(">>> Profile delete route, userId:", user_id);
      const result = await remove(user_id, profileId);

      if (result === null) {
        return res
          .status(500)
          .json({ error: "Failed to delete the user profile" });
      }

      res.status(200).json({
        message: "User profile deleted successfully.",
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);

export default router;
