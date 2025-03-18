const express = require("express");
const { register, login, logout } = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", authMiddleware, logout);

module.exports = userRouter