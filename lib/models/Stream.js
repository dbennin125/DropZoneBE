const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  gameTitle: {
    type: String,
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

  image: {
    type: String
  },

  streamerId: {
    type: Number,
    isRequired: true
  },

  viewerCount: {
    type: Number,
    isRequired: true
  },
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Stream', schema);
