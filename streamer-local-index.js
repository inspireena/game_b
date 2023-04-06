const express=require("express");
const app=express();
const cors=require("cors");
const dotenv=require("dotenv").config({path:".env.local"});
const constant = require("./api/utity/constant/constant");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require("./api/str-panal/router")(app);
console.log("=============");




global.crypto = require('crypto-browserify');
const {
    RtcTokenBuilder,
    RtcRole
} = require('agora-access-token');


app.post('/authentication/token', (req, res) => {
    const channel = req.body.channelName;
    console.log(req.body.channelName, "&&&&&&&&&*&*8&&&&^^^^^^^^^^^^^^^^");

    let appId = process.env.APP_ID;
    console.log("/////////////////", appId);
    let appCertificate = process.env.APP_CERTIFICATE;
    const channelName = channel;
    const uid = 0;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600

    const currentTimestamp = Math.floor(Date.now() / 1000)

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    // IMPORTANT! Build token with either the uid or with the user account. Comment out the option you do not want to use below.

    // Build token with uid
    const generatedToken = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
    console.log("Token With Integer Number Uid: " + generatedToken);

    res.status(200).json({
        status: true,
        generatedToken
    })

});






const PORT=constant.STREAMER_PORT;
app.listen(PORT,()=>{
    console.log("----- server start on PORT---[ streamer-local ]--",PORT);
});