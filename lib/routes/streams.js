const { Router } = require('express');
const Stream = require('../models/Stream');

module.exports = Router()
  .get('/', (req, res, next) => {
    Stream
      .find()
      .then(games => res.send(games))
      .catch(next);
  });
