const { Schema, Types, model } = require('mongoose');

const userGames = Schema(
  {

    game_name: {
      type: String,
      default: '',
    },
    game_code: {
      type: String,
      default: '',
    },
    status: {
      type: Number,  //0 Inactive 1 Active
      default: 1,
    },
    created_by: {
      type: Types.ObjectId,
      default: null,
    },
    game_conf: {
      max_player: {
        type: Number,
      },
      timer: {
        type: Number,
        default: 0
      },
      ip: {
        type: String,
        default: ""
      },
      port: {
        type: Number,
        default: ""
      },
    },
    influencer_info: {
      dateofbirth: {
        type: Date,
        default: '',
      },
      luckyno: {
        type: Array,
        default: [],
      },
      avtar_img_url: {
        type: String,
        default: '',
      },
      country: {
        type: String,
        default: '',
      },
      displayname: {
        type: String,
        default: '',
      },
      followers: {
        type: Number,
        default: 0,
      },
      points: {
        type: Number,
        default: 0,
      },
      ranking: {
        type: Number,
        default: 0,
      },
      description: {
        type: String,
        default: '',
      },
      video_streaming_url: {
        type: String,
        default: 'https://sample-live.baricata.com/sample.mp4',
      }
    },
    game_category_id: {
      type: Types.ObjectId,
      ref: 'games_category',
      default: null,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const game = model('game', userGames);
module.exports = game;
