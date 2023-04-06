const Joi = require("joi");
const fs=require("fs");
module.exports = (schema, params = "body",fileSchema=undefined,file=undefined) => async (req, res, next) => {
    try {
        console.log("======req.body=validator joi==",req[params]);
        const check = await schema.validate(req[params]);

        console.log("--check--",check)
        if (check.error) {
          return  res.status(200).json({
                status: false,subCode:405,
                message: check.error.details[0].message,
            })
        } else {
            if(file){
                console.log("======req[file]===",req[file]);
                const checkfile = await fileSchema.validate(req[file]);
                
                if(checkfile.error){
                    if(fs.existsSync(process.cwd()+`/public/apiPublic/${req[params].pathname}/${req[file].filename}`)){
                        fs.unlinkSync(process.cwd()+`/public/apiPublic/${req[params].pathname}/${req[file].filename}`)
                    }
                    return  res.status(200).json({
                        status: false,subCode:405,
                        message: checkfile.error.details[0].message,
                    })
                }
            }
            next();
        }

    } catch (error) {
        console.log("--validator==error===>", error)
        return  res.status(200).json({
            status: false,subCode:404,
            message:error.message
        })
    }
}