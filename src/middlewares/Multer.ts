import { Request } from "express";
import cloudinary from "../services/cloudinary";

// Extend Express Request interface to include Multer properties

export const uploadToCloudinary = async (
  req: Request,
  folder: string
): Promise<string[]> => {
  const uploadedPaths: string[] = [];

  const uploadFile = async (filePath: string): Promise<string> => {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
    });
    return result.secure_url;
  };

  try {
    if (req.file) {
       const url = await uploadFile(req.file.path);
      uploadedPaths.push(url);
    } else if (req.files && Array.isArray(req.files)) {
       for (const file of req.files) {
         const url = await uploadFile((file as Express.Multer.File).path);
         uploadedPaths.push(url);
       }
    } else if (req.files && typeof req.files === "object") {
      // Multer upload.fields()
      const fileFields = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
      for (const field in fileFields) {
        for (const file of fileFields[field]) {
          const url = await uploadFile(file.path);
          uploadedPaths.push(url);
        }
      }
    }

    return uploadedPaths;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload file(s) to Cloudinary");
  }
};
