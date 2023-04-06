const { Schema, Types, model } = require("mongoose");
const videoinfo=new Schema({
    title: {
        type: String,
        default: ""
    },
    type:{
        type: String,
        default: ""
    },
    video_url: {
        type: String,
        default: ""
    },
    video_info: {
        size: {
            type: Number,
            default: null
        },
        storageFormat:{
            type: String,
            default: ""
        }
    },
    description:{
        type: String,
        default: ""
    },
});
const streamerVideoSchema = Schema({
    group_id:{
        type:String,
        default:""
    },
    streamer_id: {
        type: Types.ObjectId,
        ref:"streamer",
        
    },
    videoinfo: [videoinfo],
   
    status:{
        type:Number,
        default:0
    },
    selected_by_steamer:{
        type:Number,
        default:0
    },
    
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
});
module.exports = model("steamer_video", streamerVideoSchema); 