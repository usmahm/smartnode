const express = require("express");
const isAuth = require("../middlewares/isAuth");
const { getUserByIdHandler } = require("../controllers/userController");

const router = express.Router();

router.get("/:user_id", isAuth, getUserByIdHandler);

module.exports = router;
