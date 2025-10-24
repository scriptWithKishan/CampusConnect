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

UserRouter.get("/follow-details", protectedRoutes, async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await User.findById(userId).select(
      "followers following"
    )

    if (!userData) {
      return res.status(404).json({
        status: "failure",
        message: "User not found"
      })
    }

    return res.status(200).json({
      status: "success",
      message: "Follow details fetched successfully",
      data: userData
    })

  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    })
  }
})

UserRouter.get("/search", protectedRoutes, async (req, res) => {
  try {
    const { search } = req.query;
    const {userId} = req;

    const users = await User.find({
      username: { $regex: search, $options: "i"},
      _id: {$ne: userId}
    })

    return res.status(200).json({
      status: "success",
      message: "Users fetched successfully",
      data: users
    })
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message
    })
  }
})

UserRouter.patch("/follow/:id", protectedRoutes, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    if (id === userId) {
      return res.status(400).json({
        status: "failure",
        message: "You cannot follow yourself"
      })
    }

    const user = await User.findById(userId);

    if (user.following.includes(id)) {
      // Unfollow
      await User.findByIdAndUpdate(userId, {
        $pull: { following: id }
      })

      await User.findByIdAndUpdate(id, {
        $pull: { followers: userId }
      })

      return res.status(200).json({
        status: "success",
        message: "Unfollowed successfully",
        isFollowing: false,
      })
    } else {
      // Follow
      await User.findByIdAndUpdate(userId, {
        $push: { following: id }
      })

      await User.findByIdAndUpdate(id, {
        $push: { followers: userId }
      })

      return res.status(200).json({
        status: "success",
        message: "Followed successfully",
        isFollowing: true,
      })
    }

  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message
    })
  }
})

UserRouter.get("/:id", protectedRoutes, async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findById(id).populate("username profilePic");

    if (!data) {
      return res.status(404).json({
        status: "failure",
        message: "No user found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User fetched successfully",
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



module.exports = UserRouter;
