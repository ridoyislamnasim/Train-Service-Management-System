import fs from 'fs';
import config from '../../config/config.js';

export const uploadSinglePdf = async (file) => {
  console.log('upload file', file);
  fs.access(config.uploadFolder, (error) => {
    if (error) {
      fs.mkdirSync(config.uploadFolder);
    }
  });
  const { buffer, originalname } = file;
  const filePath = `${config.uploadFolder}${originalname}`;
  console.log('filepath', filePath);
  try {
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        console.error(err);
      }
    });
    return { success: true };
  } catch (err) {
    return err;
  }
};
