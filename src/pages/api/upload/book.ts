import type { NextApiRequest, NextApiResponse } from "next";

import { uploadToS3 } from "@/utils/s3";

const formidable = require("formidable");
import { uploadToCloudinary } from "@/utils/cloudinary";
import { Fields, Files } from "formidable";
import { parseForm, FormidableError } from "@/lib/parse-form";
import { UploadApiResponse } from "cloudinary";
import { verifyJWT } from "@/safety/JWT";
const fs = require('fs');


export const config = {
  api: {
    bodyParser: false,
    
  },
  
};

type Data = {
  picture: {
    secure_url: string;
    public_id: string;
  };
  key: string;
};

let book: Data = {
  picture: {
    secure_url: "none",
    public_id: "none",
  },
  key: "none",
};

const handleFileUpload = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {


  const directory = '/var/task/src';

  if (!fs.existsSync(directory)){
      fs.mkdirSync(directory, { recursive: true });
  }
  if (req.method == 'POST' || req.method == 'post') {
    try {

      if (req.headers.cookie) {

        const isAuth = await verifyJWT(req.headers.cookie);
        if (!isAuth) {

          return res.status(500).json(book);
        }
      }
      const { fields, files } = await parseForm(req);
      const file = files.media;
      let uploadsFiles = Array.isArray(file)
        ? file.map((f) => ({
          fileName: f.originalFilename,
          urlPath: f.filepath,
          fileType: f.mimetype,
        }))
        : [
          {
            fileName: file.originalFilename,
            urlPath: file.filepath,
            fileType: file.mimetype,
          },
        ];

      //codigo para enviar la protada del libro a cloudinary y el libro a s3 va aqui
      for (let index = 0; index < uploadsFiles.length; index++) {
        const auxType = uploadsFiles[index].fileType;
        const auxPath = uploadsFiles[index].urlPath;
        const auxName = uploadsFiles[index].fileName;
        if (!auxType || !auxPath || !auxName) continue;

        if (auxType.includes("pdf")) {
          const responseS3 = await uploadToS3(
            uploadsFiles[index].urlPath,
            uploadsFiles[index].fileName as string
          );
          book.key = auxName;
        } else if (auxType.includes("image")) {
          const responseCloud = await uploadToCloudinary(
            uploadsFiles[index].urlPath
          );

          book.picture.public_id = responseCloud[0].public_id;
          book.picture.secure_url = responseCloud[0].secure_url;
        }
      }

      return res.status(200).json(book);
    } catch (e) {
      console.error('Error en el bloque catch:', e);
      if (e instanceof FormidableError) {
        
        return res.status(e.httpCode || 400).json(book);
      } else {
       
        return res.status(500).json(book);
      }
    }
  } else {
    return res.status(405).json(book);
  }


  return res.status(200).json(book);
};



export default handleFileUpload;
