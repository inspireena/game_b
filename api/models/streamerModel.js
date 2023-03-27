const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema({
  email: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: ''
  },
  image:{
    type: String,
    default: ''
  },
  streamer_name: {
    type: String,
    default: ''
  },
  displayname:{
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: ''
  },
  dateofbirth:{
    type:Date,
    default:""
  },
  luckyno:{
    type:Array
  },
  country:{
    type: String,
    default: ''
  },
  followers:{
    type:Number,
    default:0
  },
  points:{
    type:Number,
    default:0
  },
  ranking:{
    type: String,
    default: ''
  },
  description:{
    type: String,
    default: ''
  },
  video_streaming_url:{
    type: String,
    default: ''
  },
 table_color:{
  type:String,
  default:""
 },
  type: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
//   passwordChangedAt: Date,
  permission: {
    type:Array
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},{
    timestamps: true,
    versionKey: false
});

// Schema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   this.password = await bcrypt.hash(this.password, 8);

//   this.passwordChangedAt = Date.now() - 1000;

//   next();
// });

// Schema.pre('save', async function (next) {
//   if (!this.isNew) return next();

//   this.created_on = Date.now();
//   next();
// });

// Schema.methods.correctPassword = async function (
//   candidatePassword,
//   adminPassword
// ) {
//   return await bcrypt.compare(candidatePassword, adminPassword);
// };

//TODO work needs to be done

// Schema.methods.changedPasswordAfter = (JWTTimestamp) => {
//   const changedTimestamp = parseInt(
//     this.passwordChangedAt.getTime() / 1000,
//     10
//   );
//   console.log(
//     '🚀 ~ file: adminModel:47 ~ changedTimestamp',
//     changedTimestamp
//   );

//   //!work to be done

//   return JWTTimestamp < changedTimestamp;
// };

const streamer = mongoose.model('streamer', Schema);

module.exports = streamer;
