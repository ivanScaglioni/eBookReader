import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs, { PathLike } from "fs-extra";

import { deleteLocalFile } from "./fsTools";

import {AWS_BUCKET_NAME,AWS_BUCKET_REGION,AWS_PUBLIC_KEY,AWS_SECRET_KEY } from './config'
import formidable from "formidable";

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials:{
        accessKeyId:AWS_PUBLIC_KEY,
        secretAccessKey:AWS_SECRET_KEY
    }
})



export const uploadToS3 = async( filePath: string, fileName: string )=>{

  try {
    const fileContent = await fs.readFile(filePath);
    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileContent
    };

    const command = new PutObjectCommand(uploadParams);
    const res  = await client.send(command);
    deleteLocalFile(filePath)
    return res
  } catch (error) {
    console.error("Error uploading file:", error);
  }

}








// delete image from the uploads folder
const deleteLocalImage = async (localPath: string | string[]) => {
    if (Array.isArray(localPath)) {
      for (let index = 0; index < localPath.length; index++) {
        await fs.unlink(localPath[index]);
      }
    } else {
      await fs.unlink(localPath);
    }
  };
  