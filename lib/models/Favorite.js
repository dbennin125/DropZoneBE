const mongoose = require('mongoose');

const schema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    isRequired: true
  },
 
  gameId: {
    type: Number,
    isRequired: true
  }
});

module.exports = mongoose.model('Favorite', schema);
