const express=require("express");
const router = express.Router();
const {registerStreamerData,streamerLoginData,gameList,userDetails,gameStreamerInfo,changeStreamerTableColor,deleteStreamerVideo,blockPlayerChet,selectedStreamerGroupVideo,updateStreamerUrl} =require("../controller/str_controller");

router.post("/register-streamer-data",registerStreamerData);
router.post("/login-data",streamerLoginData);
router.get("/user-details",userDetails); // unused
router.get("/game-list",gameList);  //unused
router.get("/game-streamer-info",gameStreamerInfo);
router.post("/change-streamer-table-color",changeStreamerTableColor)
router.get("/delete-streamer-video",deleteStreamerVideo)
router.get("/block-player-chet",blockPlayerChet);
router.get("/select-streamering-group-video",selectedStreamerGroupVideo);
router.get("/update-streamer-url",updateStreamerUrl);
module.exports=router;