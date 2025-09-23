const express = require("express");

const UserRouter = express.Router();

const User = require("../models/user-model");
const protectedRoutes = require("../middleware/protected-routes");
const upload = require("../middleware/multer");
const cloudinary = require("../utils/cloudinary");

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

// Get user profile by ID
UserRouter.get("/profile/:id", protectedRoutes, async (req, res) => {
  try {
    const { id } = req.params;

    const userData = await User.findById(id).select("-password");

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

// Update user profile
UserRouter.patch("/profile", protectedRoutes, upload.single("profilePic"), async (req, res) => {
  try {
    const userId = req.userId;
    const { username, bio } = req.body;

    const updateData = {};
    
    if (username) {
      // Check if username is already taken by another user
      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: userId } 
      });
      
      if (existingUser) {
        return res.status(400).json({
          status: "failure",
          message: "Username is already taken",
        });
      }
      updateData.username = username;
    }

    if (bio !== undefined) updateData.bio = bio;

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        updateData.profilePic = result.url;
      } catch (err) {
        return res.status(400).json({
          status: "failure",
          message: "Failed to upload profile picture",
          error: err.message,
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Search users
UserRouter.get("/search", protectedRoutes, async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        status: "failure",
        message: "Search query is required",
      });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } }
      ]
    })
    .select("-password")
    .limit(20);

    return res.status(200).json({
      status: "success",
      message: "Users found successfully",
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Get all users (for discovery)
UserRouter.get("/all", protectedRoutes, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.userId;

    const users = await User.find({ _id: { $ne: userId } })
      .select("-password")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: users,
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
