const express = require("express");
const imageController = require("../controllers/image.controller");
const { sharpImages } = require("../middlewares/sharpImage");
const { upload } = require("./../helpers/uploadImage");
const { isImagesManager } = require("../middlewares/validate-roles");

const router = express.Router();

router
  .route("/")
  .post(
    [isImagesManager, upload.array("newImage"), sharpImages],
    imageController.uploadImage
  )
  .get(imageController.getImage);

module.exports = router;
