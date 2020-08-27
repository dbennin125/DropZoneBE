const { Router } = require('express');
const Favorite = require('../models/Favorite');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Favorite
      .create({
        ...req.body,
        user: req.user._id })
      .then(favorite => res.send(favorite))
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    Favorite
      .find({ user: req.user._id })
      .then(favorite => res.send(favorite))
      .catch(next);  
  })

  .delete('/:title', ensureAuth, (req, res, next) => {
    Favorite
      .findOneAndDelete({ user: req.user._id, gameTitle: req.params.title })
      .then(favorite => res.send(favorite))
      .catch(next);
  });
