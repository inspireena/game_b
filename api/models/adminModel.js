const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema({
  email: {
    type: String,
    default: '',
    unique: true,
  },
  phone: {
    type: String,
    default: ''
  },
  token: {
    type: String,
    default: ''
  },
  parent_id: {
    type: String,
    default: ''
  },
  operator_name: {
    type: String,
    unique: true,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  created_on: {
    type: Date,
    default: ''
  },
  passwordChangedAt: Date,
  permission: [],
  isDeleted: {
    type: Boolean,
    default: false
  }
});

Schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 8);

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

Schema.pre('save', async function (next) {
  if (!this.isNew) return next();

  this.created_on = Date.now();
  next();
});

Schema.methods.correctPassword = async function (
  candidatePassword,
  adminPassword
) {
  return await bcrypt.compare(candidatePassword, adminPassword);
};

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

const admin = mongoose.model('admin', Schema);

module.exports = admin;
