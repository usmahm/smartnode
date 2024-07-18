const express = require("express");
const { body } = require("express-validator");

const { findUserByEmail } = require("../models/userModel");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (val) => {
        const user = await findUserByEmail(val);
        if (user) {
          throw new Error("Email already in use");
        }
      })
      .normalizeEmail(),
    body("first_name").trim().notEmpty(),
    body("last_name").trim().notEmpty(),
    body("password")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Password should be a minimum length of 3"),
  ],
  authController.signup
);

router.post(
  "/login",
  [body("email").trim().notEmpty(), body("password").trim().notEmpty()],
  authController.login
);

module.exports = router;
