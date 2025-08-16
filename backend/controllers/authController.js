const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");
const { checkIfValidationError } = require("../utils/customValidationResults");
const sendResponse = require("../utils/sendResponse");

const generateAuthToken = (id, email) => {
  // console.log("HEYY 333", id, email);
  return jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.JWT_SECRET
    // {expiresIn: "1h"}
  );
};

const signupHandler = async (req, res, next) => {
  try {
    checkIfValidationError(req);

    const { first_name, last_name, email, password } = req.body;

    let createdUser = await createUser({
      first_name: first_name,
      last_name: last_name,
      password: password,
      email: email,
    });

    const token = generateAuthToken(createUser.id, createUser.email);
    sendResponse(res, 201, {
      success: true,
      message: "Signup successful",
      data: {
        access_token: token,
        user: {
          id: createdUser.id,
          first_name: createdUser.first_name,
          last_name: createdUser.last_name,
          email: createdUser.email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const loginHandler = async (req, res, next) => {
  try {
    checkIfValidationError(req);

    let user = await findUserByEmail(req.body.email);

    if (!user) {
      sendResponse(res, 401, {
        success: false,
        message: "Wrong email or password!",
        statusCode: 401,
      });
    } else {
      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        const token = generateAuthToken(user.id, user.email);

        sendResponse(res, 200, {
          success: true,
          message: "Login successful",
          data: {
            access_token: token,
            user: {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
            },
          },
        });
      } else {
        sendResponse(res, 401, {
          success: false,
          message: "Wrong email or password!",
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signupHandler,
  loginHandler,
};
