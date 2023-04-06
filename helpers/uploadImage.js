const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//necessary for saving image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    let theFile = file.originalname.split(".");
    const fileType = theFile[theFile.length - 1];

    cb(null, `${uuidv4()}.${fileType}`);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

module.exports = { upload };
