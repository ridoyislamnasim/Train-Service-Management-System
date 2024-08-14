import fs from 'fs/promises';
import path from 'path';
import config from '../../config/config.js';

export const removeUploadFile = async (fileUrl) => {
  const fileName = path.basename(fileUrl);
  const removeFile = `${config.uploadFolder}${fileName}`;
  try {
    await fs.unlink(removeFile);
  } catch (err) {
    console.log(err);
  }
};
