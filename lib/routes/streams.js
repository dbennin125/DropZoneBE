const { Router } = require('express');
const Stream = require('../models/Stream');


module.exports = Router()

  .get('/game/:id', (req, res, next) => {
    Stream
      .find({ game: req.params.id })
      .then(streams => res.send(streams))
      .catch(next);
  });
