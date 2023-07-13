const ErrorHandler = require("../utlis/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Error";
  //wrong mongo db error
  if (err.name === "CastError") {
    const message = `Resources not found with the id. Invalid id ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your url is invalid `;
    err = new ErrorHandler(message, 400);
  }
  //jwt expired
  if (err.name === "TokenExpiredError") {
    const message = `Token expired`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
