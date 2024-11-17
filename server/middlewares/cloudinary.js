import { v2 as cloudinaryV2 } from "cloudinary";

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (req, res, next) => {
  
  if (!req.files && req.files.length === 0) {
    return next();
  }
  try {
    const uploads = await Promise.all(
      req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinaryV2.uploader.upload_stream(
            { folder: "cars" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
          uploadStream.end(file.buffer);
        });
      })
    );
    req.files = uploads;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cloudinary upload failed",
      error,
    });
  }
};
