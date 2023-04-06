const express = require("express");
const roleController = require("./../controllers/role.controller");

const router = express.Router();

router.route("/").post(roleController.createRole);
router.route("/:id").put(roleController.modifyRole);

module.exports = router;
