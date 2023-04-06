const axios = require("axios");
const fs=require("fs");
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
        if(req.fileValidationError){
            return res.status(200).json({sttaus:false,subCode:404,message:req.fileValidationError});
        }
        let resData = await service.updateStreamerInfo(req);
        if(!resData.status){
            if(req.file && req.file.filename && fs.existsSync(process.cwd()+`/public/apiPublic/${req.body.pathname}/${req.file.filename}`)){
                fs.unlinkSync(process.cwd()+`/public/apiPublic/${req.body.pathname}/${req.file.filename}`)
            }
           }
        res.status(200).json(resData);
 
    }catch(error){
        if(!resData.status){
            if(req.file && req.file.filename && fs.existsSync(process.cwd()+`/public/apiPublic/${req.body.pathname}/${req.file.filename}`)){
                fs.unlinkSync(process.cwd()+`/public/apiPublic/${req.body.pathname}/${req.file.filename}`)
            }
           }
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.streamerVideoData=async(req,res)=>{
    try{
        let resData = await service.streamerVideoData(req);
        res.status(200).json(resData);

    }catch(error){
        res.status(200).json({status:false,subCode:400,message:error.message})
    }
 }
 exports.uploadSteamerVideo=async(req,res)=>{
    try{
        if(req.fileValidationError){
            return res.status(200).json({sttaus:false,subCode:404,message:req.fileValidationError});
        }
        let resData = await service.uploadSteamerVideo(req);
       if(!resData.status){
        if(req.file && req.file.filename && fs.existsSync(process.cwd()+`/public/apiPublic/${req.body.pathname}/${req.file.filename}`)){
            fs.unlinkSync(process.cwd()+`/public/apiPublic/${req.body.pathname}/${req.file.filename}`)
        }
       }
       return  res.status(200).json(resData);
 
    }catch(error){
        if(req.file && req.file.filename && fs.existsSync(process.cwd()+`/public/apiPublic/${req.body.pathname}/${req.file.filename}`)){
            fs.unlinkSync(process.cwd()+`/public/apiPublic/${req.body.pathname}/${req.file.filename}`)
        }
      return  res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.deleteStreamerVideo=async(req,res)=>{
    try{
       let resData = await service.deleteStreamerVideo(req);
       return  res.status(200).json(resData);
 
    }catch(error){
      return  res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.blockPlayerChet=async(req,res)=>{
    try{
        let resData = await service.blockPlayerChet(req);
        return  res.status(200).json(resData);
  
     }catch(error){
       return  res.status(200).json({status:false,subCode:400,message:error.message});
     }
 }
 exports.selectStreamerGroupVideo=async(req,res)=>{
    try{
        let resData = await service.selectStreamerGroupVideo(req);
        return  res.status(200).json(resData);
  
     }catch(error){
       return  res.status(200).json({status:false,subCode:400,message:error.message});
     }
 }
 exports.updateStreamerUrl=async(req,res)=>{
    try{
        let resData = await service.updateStreamerUrl(req);
        return  res.status(200).json(resData);

    }catch(error){
        throw error;
    }
 }