const { Schema, Types, model } = require('mongoose');

const games_categorySchema = Schema(
  {
    name: {
      type: String,
      default: '',
      unique:true
    },
    status: {
      type: Number,
      default: 0,
    },
    created_by: { 
      type: String,
      default: null,
    },
  
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
games_categorySchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  this.time = Date.now();

  next();
});

games_categorySchema.pre(/^find/, function(next) {
  this.find({ isDeleted: { $ne: true } });
  
  next();
});


module.exports = model('games_category', games_categorySchema);