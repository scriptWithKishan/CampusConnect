const express = require("express");

const UserRouter = express.Router();

const User = require("../models/user-model");
const protectedRoutes = require("../middleware/protected-routes");

UserRouter.get("/profile", protectedRoutes, async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await User.findById(userId).select("-password");

    if (!userData) {
      return res
        .status(404)
        .json({ status: "failure", message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "User profile fetched successfully",
      data: userData,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

module.exports = UserRouter;
