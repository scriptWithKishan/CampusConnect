const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const { PORT, DB_USER, DB_PASSWORD } = process.env;

const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.thuh2yd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to Atlas Server successfully");
  })
  .catch((err) => {
    console.error(`Error connecting to Atlas server: ${err}`);
  });

const AuthRouter = require("./controllers/auth-router");
const UserRouter = require("./controllers/user-router");
const PostRouter = require("./controllers/post-router");
const ActivityRouter = require("./controllers/activity-router");

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/post", PostRouter);
app.use("/activity", ActivityRouter);

app.use((req, res) => {
  res.status(404).json({ status: "failure", message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
