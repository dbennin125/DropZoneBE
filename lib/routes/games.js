const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()
  .get('/', (req, res, next) => {
    Game
      .find()
      .then(games => res.send(games))
      .catch(next);
  });
