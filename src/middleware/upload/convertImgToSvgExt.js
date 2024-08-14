import path from 'path';
import shortid from 'shortid';

export const convertImgToSvgExt = (fileOriginalName) => {
  const fileExt = path.extname(fileOriginalName);
  const fileName = `${fileOriginalName
    .replace(fileExt, '')
    .toLowerCase()
    .split(' ')
    .join('-')}-${shortid.generate()}.svg`;
  return fileName;
};
