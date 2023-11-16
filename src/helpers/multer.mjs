import multer from 'multer';
import path from 'path';

const uploadFile = multer.diskStorage({});

const uploadCsvFile = multer.diskStorage({
  destination: 'upload/products/csv',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.csv`); // Set the filename for the uploaded CSV file
  },
});
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    cb(new Error('File not supported'), false);
    return;
  }
  cb(null, true);
};

const csvFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.csv') {
    cb(new Error('File not supported'), false);
    return;
  }
  cb(null, true);
};

const UploadImages = (req, res, next) => {
  const upload = multer({
    storage: uploadFile,
    fileFilter,
  }).array('image');

  upload(req, res, (err) => {
    if (err) {
      res.status(500).send(`Unknown error: ${err.message}`);
    } else {
      next();
    }
  });
};

const UploadCsv = (req, res, next) => {
  const upload = multer({
    storage: uploadCsvFile,
    csvFileFilter,
  }).single('csv');

  upload(req, res, (err) => {
    if (err) {
      res.status(500).send(`Unknown error: ${err.message}`);
    } else {
      next();
    }
  });
};

export { UploadImages, UploadCsv };
