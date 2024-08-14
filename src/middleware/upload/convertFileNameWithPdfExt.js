import path from 'path';
import shortid from 'shortid';

export const convertFileNameWithPdfExt = (fileOriginalName) => {
  const fileExt = path.extname(fileOriginalName);
  const fileName = `${fileOriginalName
    .replace(fileExt, '')
    .toLowerCase()
    .split(' ')
    .join('-')}-${shortid.generate()}.pdf`;
  return fileName;
};
