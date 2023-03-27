const express=require("express");
const app=express();
const cors=require("cors");
const dotenv=require("dotenv").config({path:".env"});
const constant = require("./api/utity/constant/constant");
// var ip = require('ip').address()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require("./api/str-panal/router")(app);

const PORT=constant.STREAMER_PORT;
app.listen(PORT,()=>{
    // console.log("ip---",ip);

    console.log("----- server start on PORT---[ streamer ]--",PORT);
});