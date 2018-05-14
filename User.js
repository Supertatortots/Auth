const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.SchemaType({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if(error) {
      return next(error);
    }
    this.password = hash;
    return next();
  })
})

module.exports = mongoose.model('User', userSchema);