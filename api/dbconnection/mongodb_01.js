const mongoose=require("mongoose");
const constant = require("../utity/constant/constant");

// mongoose.set("strictQuery", true);
mongoose.set('strictQuery', false);
mongoose.connect(`${constant.DB_URL}`,{
    'useUnifiedTopology':true
})
.then(()=>{
    console.log("========  >>>    mongodb connection successfully  <<<   =========")
}).catch((error)=>{
    console.log("---DB Connection ERROR--",error.message)
});