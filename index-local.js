require("dotenv").config({path:".env.local"});
const express=require("express");
const path=require("path");
const app=express();
const db=require("./api/dbconnection/mongodb_01");
const cors=require("cors")
const constant = require("./api/utity/constant/constant");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"./public/apiPublic")));
require("./api/nodeApi/streamer/router")(app);

const port=constant.NODE_PORT;
app.listen(port,()=>{
    console.log("-----server start on port--[ node local ] --",port);
});