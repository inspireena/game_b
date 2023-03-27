const { any } = require("joi");
const { Schema, Types, model } = require("mongoose");
const player_bets = new Schema({
    position: {
        type: Number,
        default: 0
    },

    bet_type: {
        type: String,
        default: "",
    },

    bet_status: {
        type: String,
        default: "",
    },

    opening_wallet_bal: {
        type: Number,
        default: 0
    },
    closing_wallet_bal: {
        type: Number,
        default: 0
    },
    bet_amount: {
        type: Number,
        default: 0
    },
    bet_time_start: {
        type: String,
        default: ""
    }
})
const played_nos = new Schema({
    win_amount: {
        type: Number,
        default: 0
    },
    opening_wallet_bal: {
        type: Number,
        default: 0
    },
    closing_wallet_bal: {
        type: Number,
        default: 0
    },
});
const users = new Schema({
    operator_player_id: {
        type: String,
        default: ""
    },
    operator_name: {
        type: String,
        default: ""
    },
    player_id: {
        type: Types.ObjectId,
        default: null
    },
    operator_name: {
        type: String,
        default: ""
    },
    player_bets: [player_bets],
    player_win: [played_nos]
});
const games_historySchema = Schema({
    session_id: {
        type: String,
        default: ""
    },
    session_start_time: {
        type: String,
        default: ""
    },
    session_end_time: {
        type: String,
        default: ""
    },
    game_code: {
        type: String,
        default: ""
    },
    game_name: {
        type: String,
        default: ""
    },
    winning_no: {
        message: {
            type: String,
            default: ""
        },
        Number: {
            type: Number,
        },
        Nature: {
            type: String,
            default: ""
        },
        Color: {
            type: String,
            default: ""
        }
    },
    user_count: {
        type: Number,
        default: 0
    },
    winner_count: {
        type: Number,
        default: 0
    },
    total_bet_amount: {
        type: Number,
        default: 0
    },
    total_win_amount: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "0"
    },
    remarks: {
        type: String,
        default: ""
    },
    winners: {
        type: Array
    },
    users: {
        type:Object,
        default:""
    }

}, {
    versionKey: false,
    timestamps: true
});
module.exports = model("game_history", games_historySchema);