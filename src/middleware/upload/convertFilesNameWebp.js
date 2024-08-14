import { convertFileNameWithWebpExt } from './index.js';

export const convertFilesNameWebp = (files) => {
  return files.map(({ buffer, originalname, fieldname }) => ({
    buffer,
    originalname: convertFileNameWithWebpExt(originalname),
    fieldname,
  }));
};
