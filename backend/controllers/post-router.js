const express = require("express");

const PostRouter = express.Router();

const Post = require("../models/post-model");
const protectedRoutes = require("../middleware/protected-routes");

const upload = require("../middleware/multer");
const cloudinary = require("../utils/cloudinary");

PostRouter.get("/", protectedRoutes, async (req, res) => {
  try {
    const data = await Post.find()
      .populate("author", "username profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      message: "All post fetched successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

PostRouter.post(
  "/",
  protectedRoutes,
  upload.single("image"),
  async (req, res) => {
    try {
      const { content } = req.body;
      const { userId } = req;

      let imageUrl = null;

      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path);
          imageUrl = result.url;
        } catch (err) {
          return res.status(400).json({
            status: "failure",
            message: "Failed to upload the image",
            error: err.message,
          });
        }
      }

      await Post.create({
        content: content,
        author: userId,
        image: imageUrl,
      });

      return res.status(201).json({
        status: "success",
        message: "Post created successfully",
      });
    } catch (err) {
      return res.status(500).json({
        status: "failure",
        message: "Internal server error",
        error: err.message,
      });
    }
  }
);

PostRouter.get("/user", protectedRoutes, async (req, res) => {
  try {
    const { userId } = req;

    const data = await Post.find({ author: userId })
      .populate("author", "username profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      message: "All user post fetched successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

PostRouter.get("/:id", protectedRoutes, async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Post.findById(id);

    if (!data) {
      return res.status(404).json({
        status: "failure",
        message: "Post is not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Post fetched successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

PostRouter.patch("/like/:id", protectedRoutes, async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        status: "failure",
        message: "Post not found",
      });
    }

    const isLiked = post.likes.includes(userId);

    if (!isLiked) {
      await Post.findByIdAndUpdate(
        id,
        { $push: { likes: userId } },
        { new: true }
      );
    } else {
      await Post.findByIdAndUpdate(
        id,
        { $pull: { likes: userId } },
        { new: true }
      );
    }

    return res.status(200).json({
      status: "success",
      message: `Post is ${isLiked ? "disliked" : "liked"} successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

module.exports = PostRouter;
