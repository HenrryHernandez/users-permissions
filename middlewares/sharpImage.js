const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// const { id, ...data } = req.body;

// const filesArr: any = req.files || [];

// for (let file of filesArr) {
//   const { filename, originalname } = file;

//   const [fileName, fileFormat] = filename.split('.');
//   const originalFileName = originalname.split('.')[0];

//   await sharp(file.path)
//     .resize(512, 512, { fit: 'fill' })
//     .toFile(
//       path.join(
//         __dirname,
//         `../${folderName}/${fileName}_${originalFileName}.${fileFormat}`
//       )
//     )
//     .then((data) => {
//       console.log('LA IMAGEN ES = ', data);
//     });

//   fs.unlinkSync(file.path);
//   file.filename = `${fileName}_${originalFileName}.${fileFormat}`;
// }
const sharpImages = async (req, res, next) => {
  console.log(req.files);
  if (!req.files) return next();
  const imageFile = req.files[0];

  const { filename } = imageFile;
  const [fileName, fileFormat] = filename.split(".");

  const newName = `${uuidv4()}.${fileFormat}`;

  try {
    await sharp(imageFile.path)
      .resize(128, 128, { fit: "fill" })
      .toFile(path.join(__dirname, `../images/${newName}`));
  } catch (error) {
    console.log(error);
  }

  fs.unlinkSync(imageFile.path);
  imageFile.filename = newName;

  next();
};

module.exports = { sharpImages };
