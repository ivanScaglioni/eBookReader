import type { NextApiRequest, NextApiResponse } from "next";
const formidable = require("formidable");
import { uploadToCloudinary } from "@/utils/cloudinary";
import { Fields, Files } from "formidable";
import { parseForm, FormidableError } from "@/lib/parse-form";




type Data = {
    data:
        {
            secure_url: string,
            public_id:string
        }[] | null
} ;
 
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
    });
    return;
  }
  try {
    const { fields, files } = await parseForm(req);
    const file = files.media;
    let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;
    console.log(url)
    const result = await uploadToCloudinary(url);
    const urlAndPublicId = Array.isArray(result) ? result.map((img) => ({secure_url:img.secure_url , public_id:img.public_id })) : [{secure_url: result.secure_url , public_id:result.public_id}];
    res.status(200).json({
        data:urlAndPublicId,
    })
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null});
    } else {
      console.error(e);
      res.status(500).json({ data: null});
    }
  }
};

export default handler;
