const fs = require("fs");
const path = require("path");
const Image = require("../models/image.model");

exports.uploadImage = async (req, res) => {
  const imageName = req.files[0].filename;

  const newImage = await Image.create({ name: imageName });

  try {
    res.status(200).json({
      msg: "image uploaded",
      data: { newImage },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error",
    });
  }
};

exports.getImage = async (req, res) => {
  const { name } = req.query;

  try {
    let imagePath = path.join(__dirname, "../images", name);

    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    } else {
      return res.status(400).json({
        msg: "no image",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "error",
    });
  }
};
