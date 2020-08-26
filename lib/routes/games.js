const { Router } = require('express');
const Game = require('../models/Game');


const DEFAULT_PER_PAGE = 4;
// const skipPerPage = (page, perPage) => (page - 1) * perPage;
// const getTotalPages = (count, perPage) => Math.ceil(count / perPage);

module.exports = Router()

  .get('/', (req, res, next) => {
    Game
      .find()
      .then(games => res.send(games))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    // const { page = 1, perPage = DEFAULT_PER_PAGE } = req.query;

    Promise.all([
      // Game
      //   .find({ title: new RegExp(req.query.search, 'i') })
      //   .count(),
      Game
        .find({ title: new RegExp(req.query.search, 'i') })
        .limit(DEFAULT_PER_PAGE)
        // .skip(skipPerPage(page, perPage))
    ])
      .then(([
        // count, 
        games]) => res.send({
        games,
        // getTotalPages: getTotalPages(count, perPage)
      }))
      .catch(next);
  });
