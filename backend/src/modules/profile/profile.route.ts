import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createProfile,
  getProfileDetails,
  deleteProfile,
  updateProfile,
  getAllUserProfiles,
} from "./profile.services";
import {
  isValidProfilePic,
  isValidUserAddress,
  isValidUserBirthday,
  isValidUserMobileNumber,
  isValidUsername,
} from "./profile.validation";

import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import { handleError } from "../../errors/errors";
import { AuthResponse } from "../../types";
import { fileValidationMiddleware } from "../pin/pin.validation";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase.config";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  checkAuthMiddleware,
  upload.single("filename"),
  fileValidationMiddleware,
  async (req: Request, res: AuthResponse) => {
    try {
      const user_id = res.locals.authUser.user_id;
      const {
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      } = req.body;

      const fileID = uuidv4();
      const storageRef = ref(storage, `files/${fileID}`);

      if (!req.file) {
        return res.status(422).json({
          message: "No file provided for upload.",
        });
      }

      const metaData = {
        contentType: req.file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metaData
      );

      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log(">>> Req User ID:", user_id);

      let errors: { [key: string]: string } = {};

      console.log("Received data:", {
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      });

      // if (!isValidUsername(username)) {
      //   errors.username = "Invalid username.";
      // }

      // if (!isValidUserAddress(country_of_residence)) {
      //   errors.country_of_residence = "Invalid address.";
      // }

      // if (!isValidUserBirthday(birthdate)) {
      //   errors.birthdate = "Invalid birthdate";
      // }

      // if (!isValidUserMobileNumber(mobile_phone_number)) {
      //   errors.mobile_phone_number = "Invalid number.";
      // }

      // if (Object.keys(errors).length > 0) {
      //   return res.status(422).json({
      //     message: "Creating profile details failed due to validation errors.",
      //     errors,
      //   });
      // }

      const data = {
        user_id,
        profile_picture_url: downloadURL,
        username: username || "Anonymous",
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      };

      const createdUser = await createProfile(data);

      res.status(201).json({
        message: "User profile created successfully.",
        profileDetails: createdUser,
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.patch(
  "/",
  checkAuthMiddleware,
  upload.single("filename"),
  fileValidationMiddleware,
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

      const existingPin = await getProfileDetails(user_id);
      if (!existingPin) {
        return res.status(404).json({ error: "Pin not found" });
      }

      let imageUrl = existingPin.profile_picture_url;
      let previousImageUrl = existingPin.profile_picture_url;

      if (req.file) {
        const fileID = uuidv4();
        const storageRef = ref(storage, `files/${fileID}`);
        const metaData = {
          contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(
          storageRef,
          req.file.buffer,
          metaData
        );

        imageUrl = await getDownloadURL(snapshot.ref);
      }

      if (previousImageUrl && previousImageUrl !== imageUrl) {
        const previousImageRef = ref(storage, previousImageUrl);
        await deleteObject(previousImageRef);
      }

      let errors: { [key: string]: string } = {};

      // if (!isValidUsername(username)) {
      //   errors.username = "Invalid username.";
      // }

      // if (!isValidUserAddress(country_of_residence)) {
      //   errors.country_of_residence = "Invalid address.";
      // }

      // if (!isValidUserBirthday(birthdate)) {
      //   errors.birthdate = "Invalid birthdate";
      // }

      // if (!isValidUserMobileNumber(mobile_phone_number)) {
      //   errors.mobile_phone_number = "Invalid number.";
      // }

      if (Object.keys(errors).length > 0) {
        return res.status(422).json({
          message: "Updating profile details failed due to validation errors.",
          errors,
        });
      }

      const data = {
        user_id,
        profile_picture_url: imageUrl,
        username,
        description,
        country_of_residence,
        mobile_phone_number,
        birthdate,
      };
      console.log("<<<<", username);

      const updatedUser = await updateProfile(user_id, data);

      if (!updatedUser) {
        return res.status(404).json({ message: "User profile not found" });
      }

      res.status(200).json({
        message: "User profile updated successfully.",
        profileDetails: updatedUser,
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get(
  "/:userId",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      const userProfile = await getProfileDetails(userId);

      if (!userProfile) {
        return res.status(404).json({ error: "User profile not found" });
      }

      res.status(200).json(userProfile);
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  try {
    const allProfiles = await getAllUserProfiles();
    res.status(200).json(allProfiles);
  } catch (error) {
    console.error("Error fetching all user profiles:", error);
    res.status(500).json({ error: "Failed to fetch user profiles" });
  }
});

router.delete("/", checkAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.authUser.user_id;
    const deletedProfile = await deleteProfile(userId);

    if (!deletedProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
});

export default router;
