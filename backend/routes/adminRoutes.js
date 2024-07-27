const express = require("express");
const { NODE_TYPES } = require("../utils/constants");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const { body } = require("express-validator");
const {
  createNodeHandler,
  getUsersHandler,
  getNodesHandler,
  resetNodeHandler,
  getAdminIDsHandler,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/ids", isAuth, getAdminIDsHandler);

router.get("/nodes", isAuth, isAdmin, getNodesHandler);

router.get("/users", isAuth, isAdmin, getUsersHandler);

router.post(
  "/nodes",
  isAuth,
  isAdmin,
  [body("type").isIn(NODE_TYPES)],
  createNodeHandler
);

router.post("/nodes/:node_id/reset", isAuth, isAdmin, resetNodeHandler);

module.exports = router;
