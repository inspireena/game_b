const express=require("express");
const router = express.Router();
const {registerStreamerData,streamerLoginData,gameList,userDetails,gameStreamerInfo,changeStreamerTableColor} =require("../controller/str_controller");

router.post("/register-streamer-data",registerStreamerData);
router.post("/login-data",streamerLoginData);
router.get("/user-details",userDetails); // unused
router.get("/game-list",gameList);  //unused
router.get("/game-streamer-info",gameStreamerInfo);
router.post("/change-streamer-table-color",changeStreamerTableColor)

module.exports=router;