const express = require("express");
const EventHandler = require("./utlis/ErrorHandler");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({useTempFiles:true}));
//config


if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"Back-End/config/.env"
    });
}
app.use(EventHandler);
module.exports = app;