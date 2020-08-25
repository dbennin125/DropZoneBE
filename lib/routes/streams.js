const { Router } = require('express');
const Stream = require('../models/Stream');

module.exports = Router()

  .get('/:title', (req, res, next) => {
    Stream
      .find({ gameTitle: req.params.title })
      .then(streams => res.send(streams))
      .catch(next);
  });
