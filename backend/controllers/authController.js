const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");
const customValidationResults = require("../utils/customValidationResults");
const sendResponse = require("../utils/sendResponse");

const generateAuthToken = (id, email) => {
  return jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.JWT_SECRET
    // {expiresIn: "1h"}
  );
};

const signup = async (req, res, next) => {
  try {
    const errors = customValidationResults(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 422;
      error.body = {
        status: false,
        message: "Invalid data provided",
        errors: errors.array(),
      };
      throw error;
    }

    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    let createdUser = await createUser({
      first_name: first_name,
      last_name: last_name,
      password: hashedPassword,
      email: email,
    });

    const token = generateAuthToken(createUser.id, createUser.email);
    sendResponse(res, 201, {
      access_token: token,
      user: {
        id: createdUser.id,
        first_name: createdUser.first_name,
        last_name: createdUser.last_name,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const errors = customValidationResults(req);
    if (!errors.isEmpty()) {
      const error = new Error();
      error.statusCode = 422;
      error.body = {
        status: false,
        message: "Invalid data provided",
        errors: errors.array(),
      };
      throw error;
    }

    let user = await findUserByEmail(req.body.email);

    if (!user) {
      sendResponse(res, 401, {
        status: false,
        message: "Wrong email or password!",
        statusCode: 401,
      });
    } else {
      const match = await bcrypt.compare(req.body.password, user.password);

      if (match) {
        const token = generateAuthToken(user.id, user.email);

        sendResponse(res, 200, {
          status: true,
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
          status: false,
          message: "Wrong email or password!",
        });
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  signup,
  login,
};
