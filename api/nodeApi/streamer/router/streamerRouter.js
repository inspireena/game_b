const express=require("express");
const router = express.Router();
const fs=require("fs")
const userAuth= require("../../../utity/middleware/userTokenAuth");
// const {multer}=require("../../../utity/middleware/multer");
const {registerStreamerData,streamerLoginData,gameList,userDetails,gameStreamerInfo,changeStreamerTableColor,updateStreamerInfo,uploadSteamerVideo,streamerVideoData,deleteStreamerVideo,blockPlayerChet,selectStreamerGroupVideo,updateStreamerUrl} =require("../controller/str_controller");
const {loginJoiSchema,gameStreamerInfoJoiSchema,changeStreamerTableColorJoiSchema,updateStreamerInfoJoiSchema,uploadSteamerVideoJoiSchema,fileJoiSchema,deleteStreamerVideoJoiSchema,blockPlayerChetJoiSchema,group_idJoiSchema,uriJoiSchema}=require("../joiSchema/str_joiSchema");
const JoiResponse=require("../../../utity/middleware/joiResponse");
const path=require("path")
const multer=require("multer");
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        let pathname= "streamerimg";
        if (!fs.existsSync(process.cwd()+`/public/apiPublic/${pathname}`)) {
           fs.mkdirSync(process.cwd()+`/public/apiPublic/${pathname}`)
        }
      req.body.pathname=pathname;
      cb(null, `public/apiPublic/${pathname}/`)
    },
    filename: function (req, file, cb) {
      console.log("========req======",req.body);
      console.log("========file======",file);
      let ex=file.mimetype.split("/").pop()
      console.log("===file.fieldname====",file.fieldname);
      cb(null,`${Date.now()}.${ex}`)
    }
  })
  
  const upload = multer({ storage: storage,  fileFilter: (req, file, cb) =>  {
    if (
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png"
      ) {
        cb(null, true);
      } else {
        req.fileValidationError = "Only jpg, jpeg and png format allowed!";
        return cb(null, false, req.fileValidationError);
        // cb(null,false);
        // return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    }, });
  const storage_video = multer.diskStorage({
    destination: function (req, file, cb) {
      let pathname= "streamerVideo";
        if (!fs.existsSync(process.cwd()+`/public/apiPublic/${pathname}`)) {
           fs.mkdirSync(process.cwd()+`/public/apiPublic/${pathname}`)
        }
      req.body.pathname=pathname;
      cb(null, `public/apiPublic/${pathname}/`)
    },
    filename: function (req, file, cb) {
      console.log("====multer===req==body====",req.body);
      console.log("====multer===req==file====",file.mimetype.split("/").pop());
      let ex=file.mimetype.split("/").pop()
      // let extantion=file.fieldname.split('.').pop();
      console.log("===file.fieldname====",file.fieldname);
      cb(null,`${Date.now()}.${ex}`)
    }
  })
  
  const upload_video = multer({ storage: storage_video,    fileFilter: (req, file, cb) =>  {
    if (
        file.mimetype == "video/mp4" ||
        file.mimetype == "video/mkv" ||
        file.mimetype == "video/flv"
      ) {
        cb(null, true);
      } else {
        req.fileValidationError = "Only mp4, mkv and flv format allowed!";
        return cb(null, false, req.fileValidationError);
        // cb(null,false);
        // return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    }, })


console.log("---===================================================================");
router.post("/register-streamer-data",upload.single("image"),registerStreamerData);
router.post("/login-data",JoiResponse(loginJoiSchema),streamerLoginData);
router.get("/game-list",userAuth,gameList);// unused
router.get("/user-details",userAuth,userDetails)// unused
router.post("/game-streamer-info",userAuth,gameStreamerInfo);
router.post("/change-streamer-table-color",userAuth,JoiResponse(changeStreamerTableColorJoiSchema),changeStreamerTableColor);
router.post("/update-streamer-info",userAuth,upload.single("image"),JoiResponse(updateStreamerInfoJoiSchema,"body",fileJoiSchema,"file"),updateStreamerInfo);
router.get("/streamer-video-data",userAuth,streamerVideoData);
router.post("/upload-steamer-video",userAuth,upload_video.single("video"),JoiResponse(uploadSteamerVideoJoiSchema,"body",fileJoiSchema,"file"),uploadSteamerVideo);
router.get("/delete-streamer-video",userAuth,JoiResponse(deleteStreamerVideoJoiSchema,"query"),deleteStreamerVideo);
router.get("/block-player-chet",userAuth,JoiResponse(blockPlayerChetJoiSchema,"query"),blockPlayerChet);
router.get("/select-streamering-group-video",userAuth,JoiResponse(group_idJoiSchema,"query"),selectStreamerGroupVideo);
router.post("/update-streamer-url",userAuth,JoiResponse(uriJoiSchema),updateStreamerUrl);
module.exports=router;