const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  name: {
    type: String,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
