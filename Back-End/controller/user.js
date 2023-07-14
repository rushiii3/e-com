const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const router = express.Router();
const ErrorHandler = require("../utlis/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsynError");
const User = require("../model/user");

router.post("/create-user",upload.single("file"),async(req,res,next) => {
    const {name,email,password} = req.body;
    const userEmail = await User.findOne({email});
    if(userEmail){
        return next(new ErrorHandler("User Already exits",400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
        name:name,
        email:email,
        password:password,
        avatar:fileUrl,
    }
    console.log(user);
});

module.exports = router;