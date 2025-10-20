const { ADMIN_IDS } = require("../utils/constants");

const isAdmin = (req, res, next) => {
  try {
    const user_id = req.user.id;
    if (!ADMIN_IDS.includes(user_id)) {
      throw new Error();
    }
  } catch (err) {
    const error = new Error();
    error.statusCode = 403;
    error.body = {
      success: false,
      message: "User not admin",
    };
    next(error);
  }

  next();
};

module.exports = isAdmin;
