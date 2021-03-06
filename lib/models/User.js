const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  userImage: String,

}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash,
      delete ret.__v;
    }
  }
});

schema.virtual('password').set(function(password) {
  this.passwordHash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS || 5);
});

schema.statics.authorize = function(email, password) {
  return this.findOne({ email })
    .then(user => {
      if(!user) {
        throw new Error('Invalid Email/Password');
      }
      if(!bcrypt.compareSync(password, user.passwordHash)){
        throw new Error('Invalid Email/Password');
      }
      return user;
    });
};

schema.statics.verifyToken = function(token) {
  try {
    const { sub } = jwt.verify(token, process.env.APP_SECRET || 'secret');
    return this.hydrate(sub);
  } catch{
    const error = new Error(`Invalid or missing token: ${token}`);
    error.status = 401;
    throw error;
  }
};

schema.methods.authToken = function() {
  return jwt.sign({ sub: this.toJSON() }, process.env.APP_SECRET || 'secret', {
    expiresIn: '48h'
  });
};

module.exports = mongoose.model('User', schema);
