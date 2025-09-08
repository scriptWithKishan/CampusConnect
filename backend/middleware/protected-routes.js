const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const protectedRoutes = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ status: "failure", message: "Unauthorized" });
    }

    const jwtToken = authHeader.split(" ")[1];
    if (!jwtToken) {
      return res
        .status(401)
        .json({ status: "failure", message: "Unauthorized" });
    }

    const decoded = jwt.verify(jwtToken, JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ status: "failure", message: "Unauthorized" });
    }

    let userId = decoded.userId;
    req.userId = userId;
    next();
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = protectedRoutes;
