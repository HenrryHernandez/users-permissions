var ObjectId = require("mongodb").ObjectId;
const User = require("../models/user.model");
const Role = require("../models/role.model");
const { ROLES } = require("../utils/ROLES");

const isGroupsManager = async (req, res, next) => {
  // const { id } = req.params;
  // const { modifyingUserId } = req.query;
  // const isValidMongoId = ObjectId.isValid(modifyingUserId);

  // if (!isValidMongoId) {
  //   return res.status(404).json({
  //     msg: "user id not valid",
  //   });
  // }

  // const { groups: groupsAllowed } = await Role.findOne({ name: "role1" });

  // const { groups: userGroups } = await User.findById({
  //   _id: new ObjectId(modifyingUserId),
  // });

  // let allow = false;
  // groupsAllowed.forEach((groupAllowed) => {
  //   userGroups.forEach((userGroup) => {
  //     if (groupAllowed.toString() === userGroup.toString()) {
  //       allow = true;
  //     }
  //   });
  // });

  // if (allow) {
  //   next();
  // } else {
  //   return res.status(401).json({
  //     msg: "not authorized for action",
  //   });
  // }

  const { modifyingUserId } = req.query;
  const isValidMongoId = ObjectId.isValid(modifyingUserId);

  if (!isValidMongoId) {
    return res.status(404).json({
      msg: "user id not valid",
    });
  }

  const isAllowed = await isAllowedForAction(
    ROLES.groupsManager.name,
    modifyingUserId
  );

  if (isAllowed) {
    next();
  } else {
    return res.status(401).json({
      msg: "not authorized for action",
    });
  }
};

const isUsersManager = async (req, res, next) => {
  const { modifyingUserId } = req.query;
  const isValidMongoId = ObjectId.isValid(modifyingUserId);

  if (!isValidMongoId) {
    return res.status(404).json({
      msg: "user id not valid",
    });
  }

  const isAllowed = await isAllowedForAction(
    ROLES.usersManager.name,
    modifyingUserId
  );

  if (isAllowed) {
    next();
  } else {
    return res.status(401).json({
      msg: "not authorized for action",
    });
  }
};

const isImagesManager = async (req, res, next) => {
  const { modifyingUserId } = req.query;
  const isValidMongoId = ObjectId.isValid(modifyingUserId);

  if (!isValidMongoId) {
    return res.status(404).json({
      msg: "user id not valid",
    });
  }

  const isAllowed = await isAllowedForAction(
    ROLES.imagesManager.name,
    modifyingUserId
  );

  if (isAllowed) {
    next();
  } else {
    return res.status(401).json({
      msg: "not authorized for action",
    });
  }
};

const isAllowedForAction = async (role, userId) => {
  const groupsAllowed = await Role.findOne({
    name: role,
  });

  const userGroups = await User.findById({
    _id: new ObjectId(userId),
  });

  let isAllowed = false;
  groupsAllowed?.groups.forEach((groupAllowed) => {
    userGroups?.groups.forEach((userGroup) => {
      if (groupAllowed.toString() === userGroup.toString()) {
        isAllowed = true;
      }
    });
  });

  return isAllowed;
};

module.exports = { isGroupsManager, isUsersManager, isImagesManager };
