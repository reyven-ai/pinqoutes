import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import { AuthResponse } from "../../types";
import { handleError } from "../../errors/errors";
import {
  createPin,
  deletePin,
  getAllPins,
  getPinDetails,
  updatePin,
} from "./pin.services";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase.config";
import multer from "multer";
import { fileValidationMiddleware } from "./pin.validation";
import { ProfileRepository } from "../profile/profile.repository";
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post(
  "/",
  checkAuthMiddleware,
  upload.single("filename"),
  fileValidationMiddleware,
  async (req: Request, res: AuthResponse) => {
    try {
      const user_id = res.locals.authUser.user_id;
      const { title, description, link } = req.body;
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

      let fileType = "unknown";
      if (metaData.contentType.startsWith("image")) {
        fileType = "image";
      } else if (metaData.contentType.startsWith("video")) {
        fileType = "video";
      }

      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metaData
      );

      const downloadURL = await getDownloadURL(snapshot.ref);

      const profileRepository = new ProfileRepository();
      const profile = await profileRepository.getSelfUserProfile(user_id);

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      const dateTime = new Date();
      const data = {
        user_id,
        title,
        description,
        file_url: downloadURL,
        link,
        created_at: dateTime,
        created_by: profile.username,
        profile_picture_url: profile.profile_picture_url,
        file_type: fileType,
      };

      const createdPin = await createPin(data);
      res.status(201).json({
        message: "Pin uploaded successfully.",
        contentDetails: createdPin,
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);

router.get("/:id", checkAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const pinDetails = await getPinDetails(id);

    if (!pinDetails) {
      return res.status(404).json({ error: "User pins details not found" });
    }

    res.status(200).json(pinDetails);
  } catch (error) {
    handleError(error, res);
  }
});

router.get("/", checkAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const pins = await getAllPins();
    res.status(200).json(pins);
  } catch (error) {
    handleError(error, res);
  }
});

router.patch(
  "/:id",
  checkAuthMiddleware,
  upload.single("filename"),
  fileValidationMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user_id = res.locals.authUser.user_id;
      const id = req.params.id;
      const { title, description, link, created_by, profile_picture_url } =
        req.body;

      const existingPin = await getPinDetails(id);
      if (!existingPin) {
        return res.status(404).json({ error: "Pin not found" });
      }

      if (existingPin.user_id !== user_id) {
        return res
          .status(403)
          .json({ error: "Unauthorized - you do not own this pin" });
      }

      let fileUrl = existingPin.file_url;
      let previousFileUrl = existingPin.file_url;
      let fileType = "unknown"; // Initialize fileType with a default value

      if (req.file) {
        const fileID = uuidv4();
        const storageRef = ref(storage, `files/${fileID}`);
        const metaData = {
          contentType: req.file.mimetype,
        };

        // Determine file type based on contentType
        if (metaData.contentType.startsWith("image")) {
          fileType = "image";
        } else if (metaData.contentType.startsWith("video")) {
          fileType = "video";
        }

        // Upload new file
        const snapshot = await uploadBytesResumable(
          storageRef,
          req.file.buffer,
          metaData
        );
        fileUrl = await getDownloadURL(snapshot.ref);

        // Delete previous file if URL has changed
        if (previousFileUrl && previousFileUrl !== fileUrl) {
          const previousFileRef = ref(storage, previousFileUrl);
          await deleteObject(previousFileRef);
        }
      }

      // Prepare update data
      const updateData = {
        user_id,
        title: title || existingPin.title,
        description: description || existingPin.description,
        file_url: fileUrl,
        file_type: fileType,
        link: link || existingPin.link,
        updated_at: new Date(),
        created_by: created_by || existingPin.created_by,
        profile_picture_url:
          profile_picture_url || existingPin.profile_picture_url,
      };

      // Update pin in database
      const updatedPin = await updatePin(id, updateData);

      // Respond with success message and updated pin details
      res.status(200).json({
        message: "Pin updated successfully.",
        contentDetails: updatedPin,
      });
    } catch (error) {
      // Handle errors
      handleError(error, res);
    }
  }
);
router.delete(
  "/:id",
  checkAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user_id = res.locals.authUser.user_id;
      const id = req.params.id;

      const existingPin = await getPinDetails(id);
      if (!existingPin) {
        return res.status(404).json({ error: "Pin not found" });
      }

      if (existingPin.user_id !== user_id) {
        return res
          .status(403)
          .json({ error: "Unauthorized - you do not own this pin" });
      }

      const pinFileRef = ref(storage, existingPin.file_url);
      await deleteObject(pinFileRef);

      await deletePin(id);

      res.status(204).json({
        message: "Pin deleted successfully",
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);

export default router;
