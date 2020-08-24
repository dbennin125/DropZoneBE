const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    isRequired: true,
  },

  imageUrl: {
    type: String,
    isRequired: true
  },

  gameId: {
    type: Number,
    isRequired: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Game', schema);
