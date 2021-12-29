import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'C:/tripper/tripper/temp')      //you tell where to upload the files,
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + Date.now() + file.originalname.match(/\..*$/)[0])
    }
  })
  
  export const upload = multer({
      storage,
      limits: { fileSize: 1 * 1024 * 1024 * 10 },
  });