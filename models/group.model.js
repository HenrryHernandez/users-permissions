const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  prefix: {
    type: String,
    required: [true, "prefix, please"],
  },
  name: {
    type: String,
    required: [true, "name, please"],
  },
  users: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
