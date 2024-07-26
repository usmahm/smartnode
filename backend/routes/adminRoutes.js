const express = require("express");
const NodeTypes = require("../utils/constants");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const { body } = require("express-validator");
const {
  createNodeHandler,
  getUsersHandler,
  getNodesHandler,
  resetNodeHandler,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/nodes", isAuth, isAdmin, getNodesHandler);

router.get("/users", isAuth, isAdmin, getUsersHandler);

router.post(
  "/nodes",
  isAuth,
  isAdmin,
  [body("type").isIn(NodeTypes)],
  createNodeHandler
);

router.post("/nodes/:node_id/reset", isAuth, isAdmin, resetNodeHandler);

module.exports = router;
