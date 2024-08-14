import config from '../../config/config.js';

export const convertFilesArrayToObject = (files) => {
  return files.reduce((total, file) => {
    return {
      [`${file.fieldname}`]: `${config.uploadPath}${file.originalname}`,
      ...total,
    };
  }, {});
};
