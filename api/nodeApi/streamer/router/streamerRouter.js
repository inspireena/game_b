const express=require("express");
const router = express.Router();
const fs=require("fs")
const userAuth= require("../../../utity/middleware/userTokenAuth");
// const {multer}=require("../../../utity/middleware/multer");
const {registerStreamerData,streamerLoginData,gameList,userDetails,gameStreamerInfo} =require("../controller/str_controller");
const {loginJoiSchema,gameStreamerInfoJoiSchema}=require("../joiSchema/str_joiSchema");
const JoiResponse=require("../../../utity/middleware/joiResponse");
const path=require("path")
const multer=require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let pathname= "straemerimg";
        if (!fs.existsSync(process.cwd()+`/public/apiPublic/${pathname}`)) {
           fs.mkdirSync(process.cwd()+`/public/apiPublic/${pathname}`)
        }
      req.body.pathname=pathname;
      cb(null, `/${pathname}/`)
    },
    filename: function (req, file, cb) {
      let extantion=file.fieldname.split('.').pop();
      cb(null,`${Date.now()}.${extantion}`)
    }
  })
  
  const upload = multer({ storage: storage })


console.log("---===================================================================");
router.post("/register-streamer-data",upload.single("image"),registerStreamerData);
router.post("/login-data",JoiResponse(loginJoiSchema),streamerLoginData);
router.get("/game-list",userAuth,gameList);// unused
router.get("/user-details",userAuth,userDetails)// unused
router.post("/game-streamer-info",userAuth,gameStreamerInfo);

module.exports=router;