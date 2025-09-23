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
      .populate("comments.user", "username profilePic")
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
      .populate("comments.user", "username profilePic")
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

    const data = await Post.findById(id)
      .populate("author", "username profilePic")
      .populate("comments.user", "username profilePic");

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

// Add comment to post
PostRouter.post("/comment/:id", protectedRoutes, async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        status: "failure",
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        status: "failure",
        message: "Post not found",
      });
    }

    const newComment = {
      user: userId,
      text: text.trim(),
      date: new Date(),
    };

    await Post.findByIdAndUpdate(
      id,
      { $push: { comments: newComment } },
      { new: true }
    );

    return res.status(201).json({
      status: "success",
      message: "Comment added successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Get comments for a post
PostRouter.get("/comments/:id", protectedRoutes, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("comments.user", "username profilePic")
      .select("comments");

    if (!post) {
      return res.status(404).json({
        status: "failure",
        message: "Post not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Comments fetched successfully",
      data: post.comments,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Delete comment
PostRouter.delete("/comment/:postId/:commentId", protectedRoutes, async (req, res) => {
  try {
    const { userId } = req;
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "failure",
        message: "Post not found",
      });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({
        status: "failure",
        message: "Comment not found",
      });
    }

    // Check if user owns the comment or the post
    if (comment.user.toString() !== userId && post.author.toString() !== userId) {
      return res.status(403).json({
        status: "failure",
        message: "Not authorized to delete this comment",
      });
    }

    await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      message: "Comment deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Delete post
PostRouter.delete("/:id", protectedRoutes, async (req, res) => {
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

    // Check if user owns the post
    if (post.author.toString() !== userId) {
      return res.status(403).json({
        status: "failure",
        message: "Not authorized to delete this post",
      });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Update post
PostRouter.patch("/:id", protectedRoutes, upload.single("image"), async (req, res) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { content } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        status: "failure",
        message: "Post not found",
      });
    }

    // Check if user owns the post
    if (post.author.toString() !== userId) {
      return res.status(403).json({
        status: "failure",
        message: "Not authorized to update this post",
      });
    }

    const updateData = {};
    if (content) updateData.content = content;

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        updateData.image = result.url;
      } catch (err) {
        return res.status(400).json({
          status: "failure",
          message: "Failed to upload the image",
          error: err.message,
        });
      }
    }

    await Post.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(200).json({
      status: "success",
      message: "Post updated successfully",
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
