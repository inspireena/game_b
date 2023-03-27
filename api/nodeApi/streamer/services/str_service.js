const {Types}=require("mongoose");
const axios=require("axios");
const streamerModel =require("../../../models/streamerModel");
const gamesModel=require("../../../models/gamesModel");
const playerModel=require("../../../models/playerModel");
const sessionModel=require("../../../models/gameSessionModel")
const gamesCategoriesModel=require("../../../models/games_CategoriesModel");
const client=require("../../../dbconnection/client");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constant =require("../../../utity/constant/constant");
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
        const getLastSessionData = await sessionModel.findOne({}).sort({createdAt:-1}).limit(1);
        const checkLiveSession= await client.json_get(`Session:101-1679292425619`,'.users');
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