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
});

module.exports = mongoose.model('Game', schema);
