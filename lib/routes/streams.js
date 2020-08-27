const { Router } = require('express');
const Stream = require('../models/Stream');

module.exports = Router()

  .get('/:title', (req, res, next) => {
    Stream
      .find(
        req.query.search 
          ? { gameTitle: req.params.title, streamerName: new RegExp(req.query.search, 'i')    } 
          : { gameTitle: req.params.title })
      .sort({ viewerCount: 1 })
      .then(streams => res.send(streams))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Stream
      .find()
      .then(allStreams => res.send(allStreams))
      .catch(next);
  });
  
