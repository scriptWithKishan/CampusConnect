const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");

const AuthRouter = express.Router();

const { JWT_SECRET } = process.env;

AuthRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: "failure", message: "Invalid Credentials" });
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ status: "failure", message: "Invalid Credentials" });
      } else {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(200).json({
          status: "success",
          message: "Login Successful",
          token: token,
          data: {
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic,
          },
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

AuthRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        status: "failure",
        message: "User with this email or username already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        username,
        email,
        password: hashedPassword,
        bio: "",
        profilePic: "",
      });

      return res.status(201).json({
        status: "success",
        message: "User created successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failure",
      message: "Internal server error",
      error: err.message,
    });
  }
});

module.exports = AuthRouter;
