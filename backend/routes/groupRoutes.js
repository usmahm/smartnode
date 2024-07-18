const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middlewares/isAuth");
const groupController = require("../controllers/groupController");

const router = express.Router();

router.post(
  "/",
  isAuth,
  [body("name").trim().notEmpty()],
  groupController.createGroupHandler
);

router.get("/", isAuth, groupController.getAllUserGroupsHandler);

module.exports = router;
