import { Router, Request, Response } from "express";

import multer from "multer";
import { checkAuthMiddleware } from "../../middleware/checkAuthMiddleware";
import { AuthResponse } from "../../types";
import { handleError } from "../../errors/errors";
import { add } from "./pin.services";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  checkAuthMiddleware,
  upload.single("contentImage"),
  async (req: Request, res: AuthResponse) => {
    try {
      const { description } = req.body;
      const image_url = req.file ? req.file.path : "";

      const user_id = res.locals.authUser.user_id;

      console.log(">>>> request user_id", user_id);

      let errors: { [key: string]: string } = {};

      if (!image_url) {
        errors.image_url = "Content image is required.";
      }

      if (Object.keys(errors).length > 0) {
        return res.status(422).json({
          message: "Creating content failed due to validation errors.",
          errors,
        });
      }
      const created_at = new Date();
      const data = {
        user_id,
        description,
        image_url,
        created_at,
      };

      const createdPin = await add(data);

      res.status(201).json({
        message: "Content created successfully.",
        data,
        contentDetails: createdPin,
      });
    } catch (error) {
      handleError(error, res);
    }
  }
);

export default router;
