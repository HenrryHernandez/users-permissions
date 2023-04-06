const express = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isGroupsManager } = require("../middlewares/validate-roles");
const groupController = require("./../controllers/group.contoller");

const router = express.Router();

router.route("/").post(
  [
    isGroupsManager,
    (req, res, next) => {
      // function just as a reminder that we can do it like this
      next();
    },
  ],
  groupController.createGroup
);

router
  .route("/:id")
  .put([isGroupsManager], groupController.addUserToGroup)
  .delete(
    [
      isGroupsManager,
      check("id", "Not a valid Mongo Id").isMongoId(),
      validateFields,
    ],
    groupController.deleteGroup
  );

module.exports = router;
