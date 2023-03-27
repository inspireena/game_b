
const multer=require("multer");
const fs = require('fs');
exports.multer=(path)=>(req,res,next)=>{
    try{
        console.log("---multer body--",req.body);
        console.log("---path====",path);
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                  }
              req.body.path=path;
              cb(null, `/${path}`)
            },
            filename: function (req, file, cb) {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
              cb(null, file.fieldname + '-' + uniqueSuffix)
            }
          })
          
          const upload = multer({ storage: storage })
          next();
    }catch(error){
        throw error;
    }
    
}
