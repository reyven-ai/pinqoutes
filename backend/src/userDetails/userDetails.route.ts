import { Router, Request, Response } from "express";
import {
  isValidUsername,
  isValidUserAddress,
  isValidUserBirthday,
  isValidUserMobileNumber,
} from "./user.validation";
import { UserProfile } from "../models/types";
import { add, remove, update, get } from "./user.services";
import { InternalServerError } from "../errors/errors";

const router = Router();

let userDetails: { [key: string]: UserProfile } = {};

router.post(
  "/",
  // checkAuthMiddleware,
  async (req: Request<{}, {}, UserProfile>, res: Response) => {
    try {
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
          message: "Creating profile details failed due to validation errors.",
          errors,
        });
      }

      const data = {
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
      console.error("Error during user profile creation:", error);
      throw new InternalServerError("Internal Server Error");
      // res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.patch(
  "/:userId",
  // checkAuthMiddleware,
  async (req: Request<{ userId: string }, {}, UserProfile>, res: Response) => {
    try {
      const userId = req.params.userId;
      const {
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      } = req.body;

      let errors: { [key: string]: string } = {};

      // Validation logic similar to the creation route...

      if (Object.keys(errors).length > 0) {
        return res.status(422).json({
          message: "Updating profile details failed due to validation errors.",
          errors,
        });
      }

      const data = {
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      };

      await update(userId, data);

      res.status(200).json({
        message: "User profile updated successfully.",
      });
    } catch (error) {
      console.error("Error during user profile update:", error);
      throw new InternalServerError("Internal Server Error");
      // res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.delete(
  "/:userId",
  // checkAuthMiddleware,
  async (req: Request<{ userId: string }, {}, {}>, res: Response) => {
    try {
      const userId = req.params.userId;
      await remove(userId);

      res.status(204).end();
    } catch (error) {
      console.error("Error during user profile deletion:", error);
      throw new InternalServerError("Internal Server Error");
      // res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get(
  "/:userId",
  // checkAuthMiddleware,
  async (req: Request<{ userId: string }, {}, {}>, res: Response) => {
    try {
      const userId = req.params.userId;

      // Assuming you have a getUserProfile method in your service
      const userProfile = await get(userId);

      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      res.status(200).json({ userProfile });
    } catch (error) {
      console.error("Error during user profile retrieval:", error);
      throw new InternalServerError("Internal Server Error");
      // res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
