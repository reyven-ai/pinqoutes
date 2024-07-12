import { Router, Request, Response } from "express";
import path from "path";

const allowedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".svg",
  ".mp4",
  ".mov",
  ".avi",
  ".wmv",
];
const maxFileSize = 100 * 1024 * 1024; // Set a higher limit for video files (e.g., 100MB)

export function fileValidationMiddleware(
  req: Request,
  res: Response,
  next: Function
) {
  const file = req.file;

  if (!file) {
    return res.status(422).json({
      message: "No file provided for upload.",
    });
  }

  const fileExtension = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return res.status(422).json({
      message: `Invalid file extension. Allowed extensions are ${allowedExtensions.join(
        ", "
      )}`,
    });
  }

  if (file.size > maxFileSize) {
    return res.status(422).json({
      message: "File size exceeds the maximum limit of 100MB.",
    });
  }
  next();
}
