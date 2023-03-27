const { Schema, Types, model } = require("mongoose");

const userPlayerSchema = Schema({
    operator_player_id: {
        type: String,
        default: ""
    },
    operator_name: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    player_name: {
        type: String,
        default: ""
    },
    currency:{
        type: String,
        default: ""
    },
    parent_id: {
        type: Types.ObjectId,
        default: null
    },
    status: {
        type: Number,
        default: 1
    },
    img_url: {
        type: String,
        default: ""
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
});
module.exports = model("player", userPlayerSchema);