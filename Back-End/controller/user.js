const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const router = express.Router();
const ErrorHandler = require("../utlis/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsynError");
const User = require("../model/user");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendmail = require("../utlis/sendmail");
const sendToken = require("../utlis/jwtToken");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(500).json({ message: "Error Deleting file" });
        }
      });
      return next(new ErrorHandler("User Already exits", 400));
    }
    const filename = req.file.filename;
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: filename,
    };
    const activationToken = CreateActivationToken(user);
    const activationURL = `http://localhost:3000/activation/${activationToken}`;
    try {
      await sendmail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name} click the link to activate your account ${activationURL}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:- ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const CreateActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
