const express = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { isUsersManager } = require("../middlewares/validate-roles");
const userController = require("./../controllers/user.controller");

const router = express.Router();

router.route("/").post([isUsersManager], userController.createUser);
router
  .route("/:id")
  .delete(
    [
      isUsersManager,
      check("id", "Not a valid Mongo Id").isMongoId(),
      validateFields,
    ],
    userController.deleteUser
  );

module.exports = router;
