import { convertFileNameWithWebpExt } from './index.js';

export const convertObjOriginalImgNameWithWebpExt = (files) => {
  return files.map(({ buffer, originalname, fieldname }) => ({
    buffer,
    originalname: convertFileNameWithWebpExt(originalname),
    fieldname,
  }));
};
