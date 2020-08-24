const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    isRequired: true
  },

  streamerName: {
    type: String,
    isRequired: true,
  },

  streamTitle: {
    type: String,
    isRequired: true
  },

  streamImage: {
    type: String,
    isRequired: true
  },

  streamerId: {
    type: Number,
    isRequired: true
  },

  viewerCount: {
    type: Number,
    isRequired: true
  },

  streamUrl: {
    type: String,
    isRequired: true
  }
});

module.exports = mongoose.model('Stream', schema);
