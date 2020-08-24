const { Router } = require('express');
const Game = require('../models/Game');


const DEFAULT_PER_PAGE = 5;
const skipPerPage = (page, perPage) => (page - 1) * perPage;
const getTotalPages = (count, perPage) => Math.ceil(count / perPage);

module.exports = Router()

  .get('/', (req, res, next) => {
    Game
      .find()
      .then(games => res.send(games))
      .catch(next);
  })

  .get('/allGames/', (req, res, next) => {
    const { page = 1, perPage = DEFAULT_PER_PAGE } = req.query;

    Promise.all([
      Game
        .find()
        .count(),
      Game
        .find()
        .limit(perPage)
        .skip(skipPerPage(page, perPage))
    ])
      .then(([count, games]) => res.send);

    
  });
