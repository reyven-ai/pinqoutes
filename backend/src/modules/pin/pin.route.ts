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
      const { description } = req.body;
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
        req.file?.buffer,
        metaData
      );

      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log(">>>> request user_id", user_id);

      const dateTime = new Date();
      const data = {
        user_id,
        description,
        image_url: downloadURL,
        created_at: dateTime,
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
      const { description } = req.body;

      const existingPin = await getPinDetails(id);
      if (!existingPin) {
        return res.status(404).json({ error: "Pin not found" });
      }

      if (existingPin.user_id !== user_id) {
        return res
          .status(403)
          .json({ error: "Unauthorized - you do not own this pin" });
      }

      let imageUrl = existingPin.image_url;
      let previousImageUrl = existingPin.image_url;

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

      const updateData = {
        user_id,
        description: description || existingPin.description,
        image_url: imageUrl,
        updated_at: new Date(),
      };

      const updatedPin = await updatePin(id, updateData);

      res.status(200).json({
        message: "Pin updated successfully.",
        contentDetails: updatedPin,
      });
    } catch (error) {
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

      const pinImageRef = ref(storage, existingPin.image_url);
      await deleteObject(pinImageRef);

      await deletePin(id);

      res.status(204).json({
        message: "Pin deleted succesfully",
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);
export default router;
