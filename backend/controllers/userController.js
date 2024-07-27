const { findUserById } = require("../models/userModel");
const sendResponse = require("../utils/sendResponse");

const getUserByIdHandler = async (req, res, next) => {
  try {
    const user_id = req.params.user_id;

    let user = await findUserById(user_id, ["id", "first_name", "last_name"]);

    sendResponse(res, 200, {
      success: true,
      message: "User fetched successfully",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserByIdHandler,
};
