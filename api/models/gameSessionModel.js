const { Schema, Types, model } = require("mongoose");

const gameSessionSchema = Schema({
    game_code: {
        type: String,
        default: ""
    },
    status: {
        type: Number,
        default: 1
    },
    session_id: {
        type: String,
        unique: true,
        default: null
    },
    session_start_time: {
        type: String,
        default: ""
    },
    session_end_time: {
        type: String,
        default: ""

    },
    session_duration: {
        type: String,
        default: ""
    },
    session_remaining_time: {
        type: String,
        default: ""
    },
    session_status: {
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
        default: null
    },
    winner_count: {
        type: Number,
        default: null
    },
    total_bet_amount: {
        type: Number,
        default: null
    },
    total_win_amount: {
        type: Number,
        default: null
    },
    currency: {
        type: String,
        default: ""
    },
    currency_Symbol: {
        type: String,
        default: ""
    },
    remarks: {
        type: String,
        default: ""
    },
    winners: [],
    users: [{
        operator_player_id: {
            type: String,
            default: ""
        },
        operator_name: {
            type: String,
            default: ""
        },

        player_name: {
            type: String,
            default: ""
        },
        player_id: {
            type: String,
            default: ""
        },
        player_bets: [{
            position: {
                type: String,
                default: ""
            },
            bet_amount: {
                type: Number,
                default: null
            },
            opening_wallet_bal: {
                type: Number,
                default: null
            },
            closing_wallet_bal: {
                type: Number,
                default: null
            },
            bet_time_start: {
                type: String,
                default: ""
            }
        }],

        player_win: [{
            win_amount: {
                type: Number,
                default: null
            },
            opening_wallet_bal: {
                type: Number,
                default: null
            },
            closing_wallet_bal: {
                type: Number,
                default: null
            }
        }]

    }]
}, {
    timestamps: true,
    versionKey: false
}
);

module.exports = model("game_session", gameSessionSchema);