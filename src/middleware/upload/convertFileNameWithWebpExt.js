import path from 'path';
import shortid from 'shortid';

export const convertFileNameWithWebpExt = (fileOriginalName) => {
  const fileExt = path.extname(fileOriginalName);
  const fileNameWithoutExt = fileOriginalName.replace(fileExt, '');

  const fileName = `${fileNameWithoutExt
    // .replace(fileExt, '')
    .toLowerCase()
    .split(' ')
    .join('-')}-${shortid.generate()}${fileExt}`;
  return fileName;
};
