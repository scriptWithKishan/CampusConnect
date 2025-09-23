const express = require("express");

const ActivityRouter = express.Router();

const Post = require("../models/post-model");
const protectedRoutes = require("../middleware/protected-routes");

ActivityRouter.get("/liked", protectedRoutes, async (req, res) => {
  try {
    const { userId } = req;

    const data = await Post.find({
      likes: userId,
    });

    if (!data) {
      return res.status(404).json({
        status: "failure",
        message: "No liked posts found",
      });
    }

    return (
      res.status(200),
      json({
        status: "success",
        message: "Liked posts fetched successfully",
        data,
      })
    );
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

module.exports = ActivityRouter;
