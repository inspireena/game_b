const {Types}=require("mongoose");
const axios=require("axios");
const fs=require("fs");
const streamerModel =require("../../../models/streamerModel");
const gamesModel=require("../../../models/gamesModel");
const playerModel=require("../../../models/playerModel");
const sessionModel=require("../../../models/gameSessionModel")
const gamesCategoriesModel=require("../../../models/games_CategoriesModel");
const streamerVideoModel=require("../../../models/streamerVideoModel");
const client=require("../../../dbconnection/client");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constant =require("../../../utity/constant/constant");
const { log } = require("console");


function videoDeleteDueToError(){

}
exports.registerStreamerData=async(req,res)=>{
    try{
        console.log("------req.body---------",req.body);
        let {email,password,fullname,phone}=req.body
        const checkMail=await streamerModel.findOne({email:email});
        if(checkMail){
            return{
                status:false,
                subCode:400,
                message:`${email} email address already use please try another`
            }
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        req.body.password=hash;
        req.body.image=`/${req.body.pathname}/${req.file.filename}`;
        req.body.dateofbirth=new Date(req.body.dateofbirth).toISOString();
        const newStreamer =await streamerModel.create(req.body);
        if(newStreamer){
            return{
                status:true,
                subCode:201,
                message:'streamer create successfully',
                data:{
                    id:newStreamer._id
                }
            }
        }else{
            return{
                status:false,
                subCode:304,
                message:'Something is Wrong ! Please try again Letter'
            }
        }


    }catch(error){
        console.log("-REGISTER ERROR -----",error);
        throw error;
    }
}

exports.streamerLoginData=async(req,res)=>{
    try{
        let {email,password} =req.body;
        const checkMail=await streamerModel.findOne({email:email});
        if(!checkMail){
            return{
                status:false,
                subCode:400,
                message:`'${email}' mail id not register `
            }
        }
        if(checkMail.isDeleted){
            return{
                status:false,
                subCode:400,
                message:"Your Profile is inactive"
            }
        }
       const checkPass = await bcrypt.compare(password, checkMail.password);
       if(checkPass){
        let token = jwt.sign({ id:checkMail._id }, constant.JWT_SECRETKEY);
        let updateToken =await streamerModel.findOneAndUpdate({email:email},{token:token},{new:true, projection: {password: 0 }});
        updateToken.image=`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}${updateToken.image}`
        console.log("==updateToken======",updateToken);
        return{
         status:true,
         subCode:200,
         message:"Login Successfully",
         data:updateToken
        }
       }else{
        return{
            status:false,
            subCode:408,
            message:'Invalid Credentials'
        }
       }
       

    }catch(error){
        throw error;
    }
}
exports.gameList=async(req,res)=>{
    try{
        const pipline=[];
        pipline.push({
            $lookup:{
                from: "games_categories",
                localField: "game_category_id",
                foreignField: "_id",
                as: "gameCatData"
              }
        })
        pipline.push({
            $unwind:{
                path: "$gameCatData",
              }
        })
        pipline.push({
            $match:{
                status:1,
                "gameCatData.status":1
              }
        })
        pipline.push({
            $addFields:{
                game_id:"$_id"
              }
        })
        pipline.push({
            $project:{
                _id:0,
               game_id:1,
               game_name:1,
               game_code:1
              }
        })
        const gameData=await gamesModel.aggregate(pipline);
        if(gameData.length > 0){
            return{
                status:true,
                message:"Game List",
                subCode:200,
                data:gameData
            }
        }else{
            return{
                status:false,
                subCode:200,
                message:"Games not Found",
                data:gameData
            }
        }
        

    }catch(error){
        throw error;
    }
}
exports.userDetails=async(req,res)=>{
    try{
        const getUser=await streamerModel.findOne({_id:req.user._id},{password:0})
        return{status:true,subCode:200,message:"user details",data:getUser}

    }catch(error){
        throw error;
    }
}
exports.gameStreamerInfo=async(req,res)=>{
    try{
        // const streamerInfo=await streamerModel.findOne({_id:req.user._id},{password: 0 });
        // console.log("ip-----------",req.ip);
        // streamerInfo.image=`/${streamerInfo.image}`;
        // if(!streamerInfo){
        //     return{
        //         status:false,
        //         subCode:404,
        //         message:"Invalid streamer"
        //     }
        // }
        /// DAME DATA JSON  API import from PUBLIC FOLDER====START------
        // console.time("-------LivePlayer-------")
        // const LivePlayer= await axios.get("http://localhost:7000/jsondata/livegamePlayer.json");
        // console.timeEnd("-------LivePlayer-------")
        // const roomInfo = await axios.get("http://localhost:7000/jsondata/roomInfo.json");
        // let LivePlayerData = LivePlayer.data || [];
        // let roomInfoData= roomInfo.data || [];
        /// DAME DATA JSON  API import from PUBLIC FOLDER====END--------
        const getLastSessionData = await sessionModel.find({}).sort({createdAt:-1}).limit(1);
        // if(getLastSessionData){

        // }
        const checkLiveSession= await client.json_get(`Session:101-1679303948723`,'.users');
        let liveplayer=[];
        if(!checkLiveSession || checkLiveSession == null){
            liveplayer=[];
        }else{
            for await(let key of Object.values(checkLiveSession)){
                let playerData=await playerModel.findOne({_id:key.player_id},{total_points:1,operator_name:1,currency:1,player_name:1,_id:0});
                liveplayer.push(playerData)
            }
        }
        let newPlayerList=[];
        if(liveplayer.length > 0){
             newPlayerList=liveplayer.map((iteam,index)=>{
                return {
                    total_points:iteam.total_points || 0,
                    operator_name:iteam.operator_name,
                    currency:iteam.currency,
                    player_name:iteam.player_name,
                }
            }).sort((a, b)=>{
                return a.total_points < b.total_points ? -1 : (a.total_points > b.total_points ? 1 : 0);
            });
        }
        let playerList=await playerModel.aggregate([
            {
                $match: {
                    status: 1,
                    isDeleted: false,
                    total_points: { $gt: 0 }
                }
            },{
                $setWindowFields:{
                    sortBy: {"total_points":-1},
                    output: {
                      rank: {
                        $count: {},
                        window: { documents: ['unbounded', 'current'] },
                      },
                    },
              }
            },{
                $project:{
                    rank:1,
                    operator_name:1,
                    player_name:1,
                    total_points:1,
                  }
            }
        ])
       


        return{
            status:true,
            subCode:200,
            message:"streamer game info",
            data:{
                LivePlayerData:newPlayerList,
                roomInfoData:playerList
            }
        }

    }catch(error){
        throw error;
    }
}
exports.changeStreamerTableColor=async(req,res)=>{
    try{
        let {table_color}=req.body;
        const update_streamerColor=await streamerModel.findOneAndUpdate({_id:req.user._id},{$set:{table_color:table_color}},{new:true});
        if(update_streamerColor){
            return{
                status:true,
                subCode:200,
                message:"Table Color Update successfully !!",
                data:{
                    table_color:update_streamerColor.table_color
                }
            }
        }else{
            return{
                status:false,
                subCode:404,
                message:"Something Went Wrong , Table color not Change ! please try again Letter "
            }
        }

    }catch(error){
        throw error;
    }
}
exports.updateStreamerInfo=async(req,res)=>{
    try{
        console.log("===updateStreamerInfo==req.body--===",req.body,"==req.file=====",req.file);
        // let {email,phone,streamer_name,displayname,dateofbirth,description}=req.body;
        if(req.body.dateofbirth) req.body.dateofbirth=new Date(req.body.dateofbirth).toISOString() ;

        if(req.file && req.file.filename) req.body.image = `/${req.body.pathname}/${req.file.filename}`;
        const checkEmail=await streamerModel.findOne({_id:{$ne:req.user._id},email:req.body.email});
        if(checkEmail){
            return{
                status:false,
                subCode:404,
                message:`${req.body.email} - email address already register`
            }
        }
        const checkPhone=await streamerModel.findOne({_id:{$ne:req.user._id},phone:req.body.phone});
        if(checkPhone){
            return{
                status:false,
                subCode:404,
                message:`${req.body.phone} - phone address already register`
            }
        }
        const updateStremerInfoRes=await streamerModel.findOneAndUpdate({_id:req.user._id},req.body,{new:true});
        const resData = await streamerModel.aggregate([
            { $match: { _id: req.user._id } },
            {
                $project: {
                    image: { $concat: [`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}`, "$image"] },
                    email: 1,
                    streamer_name: 1,
                    displayname: 1,
                    dateofbirth: 1,
                    luckyno: 1,
                    country: 1,
                    description: 1,
                    createdAt: 1,
                    status: 1,
                    updatedAt: 1,
                    ranking: 1
                }
            }
        ])
        if(updateStremerInfoRes){
            return{
                status:true,
                subCode:200,
                message:"Steamer Update Successfully !!",
                data:resData
            }
        }else{
            return{
                status:false,
                subCode:404,
                message:"Something Went Wrong , Steamer can not Update ! please try again Letter  !!",
            }
        }

    }catch(error){
        throw error;
    }
}
async function generateRandomNofun(){
    let randomNum=Math.floor((Math.random() * 1000000) + 1);
    const checkNo=await streamerVideoModel.findOne({group_id:randomNum})
    if(checkNo){
        generateRandomNofun();
    }else  return randomNum;
    
}
exports.uploadSteamerVideo = async (req, res) => {
    try {
        const { group_id, title, type, description } = req.body;
        if (req.file && req.file.filename) {
            const { group_id, title, type, description } = req.body;
            let streamer_id = req.user._id;
            // console.log("===========",{streamer_id:streamer_id,group_id:group_id});
            const checkGroup = await streamerVideoModel.findOne({ streamer_id: streamer_id, group_id: group_id });
            let inertObj = {
                title: title,
                type: type,
                description: description || "",
            }
            inertObj.video_url = `/${req.body.pathname}/${req.file.filename}`;
            let video_info={}; video_info.size = (Number(req.file.size) / 100000).toFixed(2) ; video_info.storageFormat ="MB" ;
            inertObj['video_info']=video_info
            console.log("=inertObj==========>>>>>>>",inertObj);
            if (!checkGroup) {
                const checkGroupzerostatus = await streamerVideoModel.findOne({ streamer_id: streamer_id, status:0});
                if(checkGroupzerostatus){
                  return{  status:false,
                    subCode:404,
                    message:`Please Complete previous Video Group - ${checkGroupzerostatus.group_id}`

}                }
                console.log("=========1===1====11===11=========")
                let videoinfo = [
                    inertObj
                ]
                const updatevideo = await streamerVideoModel.create({
                    streamer_id: streamer_id,
                    group_id: group_id,
                    videoinfo: videoinfo
                })
                if (updatevideo) {
                    return {
                        status: true,
                        subCode: 200,
                        message: "video upload successfully !!",
                        data: updatevideo
                    }
                } else {
                    return {
                        status: false,
                        subCode: 404,
                        message: "Somthing Went Wrong ,failed to save video ! please try again Letter !!"
                    }
                }
            } else {
                console.log("================2222222222======checkGroup.videoinfo.length===", checkGroup.videoinfo.length)
                let checkVideoType = checkGroup.videoinfo.find(x => x.type == type)
                if (checkVideoType) {
                    return {
                        status: false,
                        subCode: 404,
                        message: `${type} already exits in this group`
                    }
                }
                if (checkGroup.videoinfo.length < 3 && checkGroup.status == 0) {
                    checkGroup.videoinfo.push(inertObj)
                    if (checkGroup.videoinfo.length == 3) {
                        checkGroup.status = 1
                    }
                    let updatenew = await checkGroup.save();
                    return {
                        status: true,
                        subCode: 200,
                        message: "video upload successfully",
                        data: updatenew
                    }
                } else {
                    return {
                        status: false,
                        subCode: 404,
                        message: "video group is already complated"
                    }
                }
            }
        }
        return {
            status: false,
            subCode: 404,
            message: "video file is required"
        }

    } catch (error) {
        console.log("====error=========>>>>>",error);
        throw error;
    }
}
exports.streamerVideoData=async(req,res)=>{
    try{
        let {_id}=req.user;
        let video_status;
        let newGroup_id="";
        const streamerVideos=await streamerVideoModel.find({streamer_id:_id}).sort({updatedAt:-1,status:1});
        let inCompVideoStatus=[];
        let completeVideo=[];
        if(!streamerVideos.length > 0){
            newGroup_id = await generateRandomNofun();
            video_status=0
        }else if(streamerVideos.length > 0){
            let checkIncomaplteVideo=streamerVideos.filter(x=> {if(x.status == 0){
                let urlvideoinfo= x.videoinfo.map(item=>{
                    item.video_url = `${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}${item.video_url}`
                })
                x.video_info=urlvideoinfo
                console.log("==x.videoinfo===",x.videoinfo);
                return true
            }}).sort((a,b)=>{
                return b.updatedAt - a.updatedAt
            });
            completeVideo= streamerVideos.filter(x=> {if(x.status == 1){
                let urlvideoinfo= x.videoinfo.map(item=>{
                    item.video_url = `${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}${item.video_url}`
                })
                x.video_info=urlvideoinfo
                console.log("==x.videoinfo===",x.videoinfo);
                return true
            }}).sort((a,b)=>{
                return b.updatedAt - a.updatedAt
            }) 
            if(checkIncomaplteVideo.length > 0){
                inCompVideoStatus=checkIncomaplteVideo
                video_status=1;
                newGroup_id=""
            }else{
                newGroup_id = await generateRandomNofun();
                video_status=0
            }
        }
        
       
            return{
                status:true,
                message:"steamer video data",
                data:{
                    video_status,
                    newGroup_id,
                    inCompVideoStatus,
                    completeVideo
                }
            }
       

    }catch(error){
        throw error;
    }
}
exports.deleteStreamerVideo=async(req,res)=>{
    try{
        let {video_id,group_id} =req.query;
        console.log("======cccccc=====",await streamerVideoModel.findOne({streamer_id:req.user._id,group_id:group_id}));
        const deleteStreamervide=await streamerVideoModel.findOneAndUpdate({streamer_id:req.user._id,group_id,status:0},{
            $pull:{
                videoinfo:{
                    _id:video_id
                }
            },
            $set:{status:0}
        },{new:true});
        console.log("======deleteStreamervide================================",deleteStreamervide);
        if(deleteStreamervide){
            return{
                status:true,
                subCode:200,
                message:"streamer video delete successfully"
            }
        }else{
            return{
                status:false,
                subCode:404,
                message:"streamer video can not be delete !!"
            }
        }
       

    }catch(error){
        throw error;
    }
}
exports.blockPlayerChet=async(req,res)=>{
    try{
        const {player_id,block,addicted}=req.query;
        console.log("==req.query==",req.query);
        if(!block && !addicted){
            return{
                status:false,
                subCode:404,
                message:"please select One block or addicted"
            }
        }
        if(block){
            const blockChetPLayer = await playerModel.updateOne({_id:player_id},{
                $set:{chet_block_info:{chet_block_status:true}}
            })
            console.log("==blockChetPLayer===",blockChetPLayer);
            await playerModel.updateOne({_id:player_id},{
                $addToSet:{"chet_block_info.block_by_steamer":req.user._id},
            })
            // console.log("===blockChetPLayer===mongoose",blockChetPLayer);
            const updateinredis=await client.json_set(`User:${player_id}`,".chet_block",true );
            // console.log("===blockChetPLayer===redis",updateinredis);
           
        }
        if(addicted){
            const blockChetPLayer = await playerModel.updateOne({_id:player_id},{
                $set:{addicted_block_info:{addicted_block_status:true}}
            })
            await playerModel.updateOne({_id:player_id},{
                $addToSet:{"addicted_block_info.block_by_steamer":req.user._id},
            })
            // console.log("===blockChetPLayer===mongoose",blockChetPLayer);
            const updateinredis2=await client.json_set(`User:${player_id}`,".addicted_block",true );
            // console.log("===blockChetPLayer===redis",updateinredis);
           
        }
        return {
            status:true,
            subCode:200,
            message:`player ${block ? block : ""} ${addicted ? addicted : ""} block successfully`
        }
        

    }catch(error){
        console.log("=====error===",error);
        throw error;
    }
}
async function updateStreamerVideoModelMany(model,finddata,setdata){
   let nn= await model.updateMany(finddata,{$set:setdata});
   console.log("==nn==",nn);
}
async function updateStreamerVideoModelOne(model,finddata,setdata){
    const mm= await model.updateOne(finddata,{$set:setdata});
console.log("===mm===",mm);
}
exports.selectStreamerGroupVideo=async(req,res)=>{
    try{
        let {group_id}=req.query;
        const checkprevious=await streamerVideoModel.find({streamer_id:req.user._id,selected_by_steamer:1});
        if(checkprevious.length > 0){
            updateStreamerVideoModelMany(streamerVideoModel,{streamer_id:req.user._id,selected_by_steamer:1,group_id:{$ne:group_id}},{selected_by_steamer:0});
        }
        updateStreamerVideoModelOne(streamerVideoModel,{streamer_id:req.user._id,group_id},{selected_by_steamer:1})
       
        return{
            status:true,
            subCode:200,
            message:"select the streaming video successfully"
        }

    }catch(error){
        throw error;
    }
}
exports.updateStreamerUrl=async(req,res)=>{
    try{
        const {url} =req.body;
        const updateSteamer=await streamerModel.updateOne({_id:req.user._id},{$set:{video_streaming_url:url}});
        if(updateSteamer.modifiedCount > 0){
            return{
                status:true,
                subCode:200,
                message:"streamer video update successfully"
            }
        }else{
            return{
                status:false,
                subCode:404,
                message:"Steamer can not be update ! Please Try Letter"
            } 
        }

    }catch(error){
        throw error;
    }
}