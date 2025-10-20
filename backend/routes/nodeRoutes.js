const express = require("express");
const { body } = require("express-validator");
const nodeController = require("../controllers/nodeController");
const { findGroupById } = require("../models/groupModel");
const isAuth = require("../middlewares/isAuth");
const { NODE_STATES } = require("../utils/constants");

const router = express.Router();

router.post(
  "/:node_id/activate",
  isAuth,
  [
    body("group_id")
      .trim()
      .notEmpty()
      .custom(async (val, { req }) => {
        const group = await findGroupById(val);
        if (!group) {
          throw new Error("Group doesn't exist");
        } else {
          if (req.user.id !== group.user_id) {
            throw new Error("User not owner of group");
          }
        }
      }),
    body("name").trim().notEmpty(),
  ],
  nodeController.activateNodeHandler
);

router.get("/:node_id/state", nodeController.getNodeState);
router.post(
  "/:node_id/state",
  isAuth,
  [[body("state").isIn(NODE_STATES)], body("duration").optional().isNumeric()],
  nodeController.changeNodeStateHandler
);

module.exports = router;
