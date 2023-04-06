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
    },
    chet_block_info: {
        chet_block_status: {
          type: Boolean,
          default: false
        },
        block_by_steamer: [
            {
              type: String,
              // ref: "streamer"
            }
          ]
    },
    addicted_block_info: {
        addicted_block_status: {
          type: Boolean,
          default: false
        },
        block_by_steamer: [
            {
              type: String,
              // ref: "streamer"
            }
          ]
    }
}, {
    versionKey: false,
    timestamps: true
});
module.exports = model("player", userPlayerSchema);