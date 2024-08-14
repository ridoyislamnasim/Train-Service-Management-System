import fs from 'fs';
// import sharp from 'sharp';
import config from '../../config/config.js';

export const uploadSingleImg = async (file) => {
  // console.log('img', file);
  fs.access(config.uploadFolder, (error) => {
    if (error) {
      fs.mkdirSync(config.uploadFolder);
    }
  });
  const { buffer, originalname } = file;


  // try {
  //   // const webpBuffer = await sharp(buffer).webp().toBuffer();
  //   const webpBuffer = await sharp(buffer).toBuffer();
  //   await sharp(webpBuffer)
  //     // .webp()
  //     .toFile(`${config.uploadFolder}${originalname}`);
  //   return { success: true };
  // } catch (err) {
  //   return err;
  // }

  try {
    fs.writeFileSync(`${config.uploadFolder}${originalname}`, buffer);
    return { success: true };
  } catch (err) {
    return err;
  }
};


