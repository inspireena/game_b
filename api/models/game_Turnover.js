const { Schema, Types, model } = require('mongoose');

const operator = Schema({
 name: {
      type: String,
      default: '',
    },
    totalBet: {
      type:Number,
      default: 0,
    },
    totalWin: {
      type:Number,
      default: 0,
    }
})
const turnOver = Schema(
  {

    totalBets: {
      type: String,
      default: '',
    },
    totalAmount: {
      type: String,
      default: '',
    },
    totalWin: {
      type: String,
      default: '',
    },
    GGR: {
      type:Number,
      default: 0,
    },
    RTP: {
      type:Number,
      default: 0,
    },
    operator: [operator]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const game_Turnover = model('game_Turnover', turnOver);
module.exports = game_Turnover;
