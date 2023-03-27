 const axios = require("axios");
const { async } = require("q");
 const constant=require("../../utity/constant/constant");

 exports.registerStreamerData=async(req,res)=>{
    try{
        console.log("----streamer body----",req.body);
        console.log("-----",`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/register-streamer-data`);
        const resData=await axios.post(`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/register-streamer-data`,req.body);
        console.log("---resData---",resData.data);
        res.status(200).json(resData.data);

    }catch(error){
        console.log("-------error register st--",error);
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.streamerLoginData=async(req,res)=>{
    try{
        console.log("-----",`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/login-data`);
        const resData=await axios.post(`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/login-data`,req.body);
        console.log("---resData---",resData.data);
        res.status(200).json(resData.data);

    }catch(error){
        console.log("-------error register st--",error);
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.gameList=async(req,res)=>{
    try{
        if (req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
            if (token) {
                let config = {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  }
        console.log("-----",`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/game-list`,config);
        const resData=await axios.get(`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/game-list`,config);
        console.log("---resData---",resData.data);
        res.status(200).json(resData.data);
            }else{
                res.status(200).json({status:false,subCode:404,message:"Invalid Token"}); 
            }
        }else{
            res.status(200).json({status:false,subCode:404,message:"Invalid Token"}); 
        }

    }catch(error){
        console.log("-------error register st--",error);
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.userDetails=async(req,res)=>{
    try{
        if (req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
            if (token) {
                let config = {
                    headers: {
                      'Authorization': 'Bearer ' + token
                    }
                  }
        console.log("-----",`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/user-details`,config);
        const resData=await axios.get(`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/user-details`,config);
        console.log("---resData---",resData.data);
        res.status(200).json(resData.data);
            }else{
                res.status(200).json({status:false,subCode:404,message:"Invalid Token"}); 
            }
        }else{
            res.status(200).json({status:false,subCode:404,message:"Invalid Token"}); 
        }

    }catch(error){
        console.log("-------error register st--",error);
        res.status(200).json({status:false,subCode:400,message:error.message});
    }
 }
 exports.gameStreamerInfo=async(req,res)=>{
    try{
        if (req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
            if (token) {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    
                }

                const resData = await axios.post(`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/game-streamer-info`,req.body, config);
                console.log("---resData---", resData.data);
                res.status(200).json(resData.data);
            }else{
                res.status(200).json({status:false,subCode:404,message:"Invalid Token"}); 
            }
        }else{
            res.status(200).json({status:false,subCode:404,message:"Invalid Token"}); 
        }

    }catch(error){
        res.send({status:false,subCode:400,message:error.message})
    }
 }