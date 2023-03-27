const axios = require("axios");

const service=require("../services/str_service");
exports.registerStreamerData=async(req,res)=>{
   try{
       let resData = await service.registerStreamerData(req);
       res.status(200).json(resData);

   }catch(error){
       res.status(200).json({status:false,subCode:400,message:error.message});
   }
}
exports.streamerLoginData=async(req,res)=>{
    try{
        let resData = await service.streamerLoginData(req);
        res.status(200).json(resData);
 
    }catch(error){
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.gameList=async(req,res)=>{
    try{
        let resData = await service.gameList(req);
        res.status(200).json(resData);
 
    }catch(error){
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.userDetails=async(req,res)=>{
    try{
        let resData = await service.userDetails(req);
        res.status(200).json(resData);
 
    }catch(error){
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.gameStreamerInfo=async(req,res)=>{
    try{
        let resData = await service.gameStreamerInfo(req);
        res.status(200).json(resData);
 
    }catch(error){
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.changeStreamerTableColor=async(req,res)=>{
    try{
        let resData = await service.changeStreamerTableColor(req);
        res.status(200).json(resData);
 
    }catch(error){
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.updateStreamerInfo=async(req,res)=>{
    try{
        let resData = await service.updateStreamerInfo(req);
        res.status(200).json(resData);
 
    }catch(error){
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }