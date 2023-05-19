import { PutObjectCommand, S3Client , GetObjectCommand } from "@aws-sdk/client-s3";
import fs, { PathLike } from "fs-extra";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { deleteLocalFile } from "./fsTools";

import {AWS_BUCKET_NAME,AWS_BUCKET_REGION,AWS_PUBLIC_KEY,AWS_SECRET_KEY } from './config'


const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials:{
        accessKeyId:AWS_PUBLIC_KEY,
        secretAccessKey:AWS_SECRET_KEY
    }
})

export const getUrlS3 = async(key:string)=>{
  const command = new GetObjectCommand({
    Bucket:AWS_BUCKET_NAME,
    Key:key
  })
  return  await getSignedUrl(client, command , { expiresIn: 3600 } )
}

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
  