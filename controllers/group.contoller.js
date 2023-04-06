const User = require("../models/user.model");
const Group = require("./../models/group.model");

exports.createGroup = async (req, res) => {
  try {
    const newGroup = await Group.create(req.body);

    res.status(200).json({
      msg: "group created successfully",
      data: {
        group: newGroup,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error",
    });
  }
};

exports.deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    await Group.findByIdAndDelete(id);

    res.json({ msg: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error",
    });
  }
};

//situation: one might fail
exports.addUserToGroup = async (req, res) => {
  const { userId } = req.body;
  const groupId = req.params.id;

  try {
    await Group.findByIdAndUpdate(groupId, { $push: { users: [userId] } });
    await User.findByIdAndUpdate(userId, { $push: { groups: [groupId] } });

    res.status(200).json({
      msg: "user added to group successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error",
    });
  }
};

exports.unlinkUserFromGroup = async (req, res) => {
  const { userId, groupId } = req.body;

  try {
    await Group.findByIdAndUpdate(groupId, { $pullAll: { users: [userId] } });
    await User.findByIdAndUpdate(userId, { $pullAll: { groups: [groupId] } });

    res.status(200).json({
      msg: "user removed from group successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error",
    });
  }
};
