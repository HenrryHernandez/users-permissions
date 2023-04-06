const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const roleSchema = new mongoose.Schema({
  prefix: {
    type: String,
    required: [true, "prefix, please"],
  },
  name: {
    type: String,
    required: [true, "name, please"],
  },
  description: { type: String },
  groups: [
    {
      type: ObjectId,
      ref: "Group",
    },
  ],
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
