const jwt = require("jsonwebtoken")
const streamerModel = require("../../models/streamerModel");
const constant = require("../constant/constant");

const Auth = async (req, res, next) => {
    try {
        console.log("---steamer----auth---req.url---------",req.url)
        console.log("---steamer----auth---req.body---------",req.body)

           let token = req.header("Authorization").replace("Bearer ", "");
            console.log("--------token ---------",token);
            if (token) {
                    const decoded = jwt.verify(token, constant.JWT_SECRETKEY);
                    const user = await streamerModel.findOne({ _id: decoded.id, token: token });
                   
                    if (!user) {
                        return   res.send({ status: false, subCode: 401, message: 'Invalid Authantication' })
                    }else{
                        req.token = token;
                        req.user = user
                        next();
                    }
                   
                
            } else {
               return  res.send({ status: false, subCode: 401, message: 'Invalid Token' })
            }
       
       

    } catch (error) {
        console.log("--------------------Authantication error============>>",error.message);
        res.send({status:false,subCode:401,message:error.message});
    }
}

module.exports = Auth