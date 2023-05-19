import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

import { deleteLocalFile } from "./fsTools";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload file
export const uploadToCloudinary = async (filePath: string | string[]) => {
  if (Array.isArray(filePath)) {
    let res: UploadApiResponse[] = [];
    for (let index = 0; index < filePath.length; index++) {
      const cloidinaryRespondse = await cloudinary.uploader.upload(
        filePath[index],
        { folder: "eCommerce", resource_type: "image" }
      );
      res.push(cloidinaryRespondse);
    }
    deleteLocalFile(filePath);
    return res;
  } else {
    const res = await cloudinary.uploader.upload(filePath, {
      folder: "catacpol",
      resource_type: "image",
    });
    deleteLocalFile(filePath);
    return res;
  }
};

// delete the image from cloudinary
export const deleteFromCloudinary = async (public_id: string) => {
  return await cloudinary.uploader.destroy(public_id);
};



