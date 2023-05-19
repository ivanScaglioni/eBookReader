import fs from "fs-extra";

// delete image from the uploads folder
export const deleteLocalFile = async (localPath: string | string[]) => {
    if (Array.isArray(localPath)) {
      for (let index = 0; index < localPath.length; index++) {
        await fs.unlink(localPath[index]);
      }
    } else {
      await fs.unlink(localPath);
    }
  };
  