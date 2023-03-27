const {Schema,Types,model}=require("mongoose");

const userPlayerSchema= Schema({
    operator_player_id:{
         type:String,
        default:""
    },
    operator_name:{
        type:String,
        default:""
    },
    wallet:{
        type:Number,
        default:0
    },
    currency:{
        type: String,
        default: ""
    },
    game_code:{
        type:String,
        default:""
    }
},{
    versionKey:false,
    timestamps:true
});
module.exports= model("player_wallet",userPlayerSchema);