const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()

  .get('/', (req, res, next) => {
    Game
      .find(
        req.query.search 
          ? { title: new RegExp(req.query.search, 'i') } 
          : {}
      )
      .sort({ title: 1 })
      .then((games) => res.send(games))
      .catch(next);
  });
