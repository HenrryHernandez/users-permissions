const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name, please"],
  },
  password: {
    type: String,
    required: [true, "password, please"],
  },
  groups: [
    {
      type: ObjectId,
      ref: "Group",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
