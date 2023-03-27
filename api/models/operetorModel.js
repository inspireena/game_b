const bcrypt = require('bcryptjs');
const { generateSecret_id } = require('../utility/generateSecret_id')
const { generateSecret_key } = require('../utility/generateSecret_key')
const { Schema, model, Types, mongoose } = require('mongoose');

const operatorSchema = Schema(
  {
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    operator_name: {
      type: String,
      default: '',
    },
    // operator_name:{
    //   type: String,
    //   default: '',
    // },
    password: {
      type: String,
      default: '',
    },
    secret_id: {
      type: String,
      default: '',
    },
    secret_key: {
      type: String,
      default: '',
    },
    expired_on: {
      type: Date,
      default: '',
    },
    country_id: {
      type: String,
      default: '',
    },
    // parent_id: {
    //   type: Types.ObjectId,
    //   default: '',
    // },
    parent_id: {
      type: String,
      default: '',
    },
    currency: {
      type: String,
      default: '',
    },
    currency_Symbol: {
      type: String,
      default: '',
    },
    status: {
      type: Number,
      default: 1,
    },
    permission: [],
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

operatorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 8);

  this.passwordChangedAt = Date.now() - 1000;

  next();
});

operatorSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  this.secret_id = generateSecret_id();
  this.secret_key = generateSecret_key();

  next();
});

operatorSchema.methods.correctPassword = async function (
  candidatePassword,
  partnerPassword
) {
  return await bcrypt.compare(candidatePassword, partnerPassword);
};



//TODO work needs to be done

// userPartnerSchema.methods.changedPasswordAfter = (JWTTimestamp) => {
//   const changedTimestamp = parseInt(
//     this.passwordChangedAt.getTime() / 1000,
//     10
//   );
//   //!work to be done

//   return JWTTimestamp < changedTimestamp;
// };

module.exports = model('operator', operatorSchema);
