const admin_ids = ["ae5985fc-1fd8-49d7-b2b7-954b5fdf575b"];

const isAdmin = (req, res, next) => {
  try {
    const user_id = req.user.id;
    if (!admin_ids.includes(user_id)) {
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
