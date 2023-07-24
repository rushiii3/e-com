const ErrorHandler = require("../utlis/ErrorHandler");
const catchasync = require("./catchAsynError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");


exports.isAuthenticated = catchasync(async(req,res,next) => {
    const {token} = req;
    console.log(token);
    if(!token){
        return next(new ErrorHandler("Please login to continue",400));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
})