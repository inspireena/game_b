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
 exports.changeStreamerTableColor=async(req,res)=>{
    try{
        if (req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
            if (token) {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    
                }

                const resData = await axios.post(`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/change-streamer-table-color`,req.body, config);
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
 exports.deleteStreamerVideo=async(req,res)=>{
    try{
        if (req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
            if (token) {
                let config = {
                    params:{video_id:req.query.video_id,group_id:req.query.group_id},
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    
                }

                const resData = await axios.get(`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/delete-streamer-video`,config);
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
 exports.blockPlayerChet=async(req,res)=>{
    try{
    if (req.header("Authorization")) {
        token = req.header("Authorization").replace("Bearer ", "");
        if (token) {
            let config = {
                params:{player_id:req.query.player_id,block:req.query.block,addicted:req.query.addicted},
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                
            }

            const resData = await axios.get(`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/block-player-chet`,config);
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
 exports.selectedStreamerGroupVideo=async(req,res)=>{
    try{
        if (req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
            if (token) {
                let config = {
                    params:{group_id:req.query.group_id},
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    
                }
    
                const resData = await axios.get(`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/select-streamering-group-video`,config);
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
 exports.updateStreamerUrl=async(req,res)=>{
    try{
        if (req.header("Authorization")) {
            token = req.header("Authorization").replace("Bearer ", "");
            if (token) {
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                }
    
                const resData = await axios.post(`${constant.BASE_URLS.NODE_URL}${constant.NODE_PORT}/${constant.MIDDLE_URL.NODE_STR_MIDDLE}/update-streamer-url`,req.body,config);
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