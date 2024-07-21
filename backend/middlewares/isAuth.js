const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const auth_token = req.get("Authorization");
    if (!auth_token) {
      throw new Error();
    }

    const decoded = jwt.verify(
      auth_token.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (!decoded) {
      throw new Error();
    }

    if (!decoded.id || !decoded.email) {
      throw new Error();
    }

    req.user = { id: decoded.id, email: decoded.email };
  } catch (err) {
    const error = new Error();
    error.statusCode = 401;
    error.body = {
      success: false,
      message: "Unauthorized to access resource",
    };
    next(error);
  }

  next();
};

module.exports = isAuth;
