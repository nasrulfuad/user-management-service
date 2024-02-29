import multer, { FileFilterCallback } from "multer";
import { HttpBadRequestError } from "./http/error";
import path from "path";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.dirname(__dirname) + "/../public/uploads");
  },

  filename: function (req, file, cb) {
    const fileName = file.originalname.split(".")[0];
    const fileExtension = file.originalname.split(".")[1];

    cb(null, `${Date.now()}.${fileExtension}`);
  },
});

async function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  console.log(">>>", file);
  if (!file) {
    cb(new HttpBadRequestError("Avatar Image is Required!"));
  }

  // Check if the file is an image with the allowed extensions
  const fileExtension = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

  const isImage = file.mimetype.startsWith("image/");
  const isAllowedExtension = allowedExtensions.includes(fileExtension);

  if (!isImage || !isAllowedExtension) {
    cb(
      new HttpBadRequestError(
        "Invalid file type. Only image files (PNG, JPG, JPEG, GIF, and WebP) are allowed."
      )
    );
  }

  cb(null, true);
}

const ONE_MB = 1 * 1000 * 1000;
const limits = {
  fileSize: ONE_MB,
  files: 10,
};

export const uploader = multer({ storage, limits, fileFilter });
