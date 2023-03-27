const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  time: Date,
  user_type: String,
  user_id: String,
  device_info: {
    device_type: String,
  },
  token: String,
  location_info: {
    Ip: String,
  },
});

Schema.pre('save', async function (next) {
  if (!this.isNew) return next();
  this.time = Date.now();

  next();
});

const Login_history = mongoose.model('Login_history', Schema);

module.exports = Login_history;
