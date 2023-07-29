const ErrorHandler = require("../utlis/ErrorHandler");
const catchasync = require("./catchAsynError");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const user = require("../model/user");


exports.isAuthenticated = catchasync(async(req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to continue",400));
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user_infos = JSON.parse(JSON.stringify(decoded));
    const user_id = user_infos.user_info._id;
    req.user = await User.findById(user_id);
    
    next();
})