const express = require("express");
const { body } = require("express-validator");
const nodeController = require("../controllers/nodeController");
const NodeTypes = require("../utils/constants");
const { findGroupById } = require("../models/groupModel");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post(
  "/",
  isAuth,
  [
    body("type").isIn(NodeTypes),
    body("group_id")
      .trim()
      .notEmpty()
      .custom(async (val, { req }) => {
        const group = await findGroupById(val);
        if (!group) {
          throw new Error("Group doesn't exist");
        } else {
          console.log(group, req.user.id, group.user_id);
          if (req.user.id !== group.user_id) {
            throw new Error("User not owner of group");
          }
        }
      }),
    body("name").trim().notEmpty(),
  ],
  nodeController.createNodeHandler
);

module.exports = router;
