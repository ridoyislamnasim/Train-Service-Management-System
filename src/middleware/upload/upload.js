import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 102400000,
  },
  fileFilter: (req, file, cb) => {
    console.log(file);
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/webp' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'image/svg+xml' ||
      file.mimetype === 'image/svg' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/avif' ||
      // check for video allowed formate all video formate will allow
      file.mimetype?.includes('video')
    ) {
      cb(null, true);
    } else {
      cb(new Error('only .jpg, .png, .jpeg or .webp formate allowed'));
    }
  },
});
