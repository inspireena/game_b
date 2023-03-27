const bcrypt = require('bcryptjs');
const { generateSecret_id } = require('../utility/generateSecret_id');
const { generateSecret_key } = require('../utility/generateSecret_key');
const { Schema, model, Types } = require('mongoose');
const { number } = require('joi');

const chipDetailsSchema = Schema(
    {
        operator_id: {
            type: String,
            default: ""
        },
        operator_name: {
            type: String,
            default: ""
        },
        game_name: {
            type: String,
            default: ""
        },
        game_code: {
            type: String,
            default: ""
        },
        chip_values: [
            {
                currency: { type: String },
                currency_symbol: { type: String },
                normal_value: { type: Array },
                special_value: { type: Array }
            }
        ],
        // currency: {
        //     type: String,
        //     default: ""
        // },
        // currency_Symbol: {
        //     type: String,
        //     default: ""
        // },
        // chip_values: {
        //     type: Array
        // },
        bet_configuration: {
            minbet: {
                type: Number,
                //type: String,
            },
            maxbet: {
                type: Number,
                //type: String,
            }
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


module.exports = model('chip_detail', chipDetailsSchema);
