const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensureAuth');

const setCookie = (user, res) => {
  res.cookie('session', user.authToken(), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'none',
    secure: true,
  });
  res.send(user);
}; 

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => setCookie(user, res))
      .catch(next);  
  })

  .post('/login', (req, res, next) => {
    User
      .authorize(req.body.email, req.body.password)
      .then(user => setCookie(user, res))
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  })

  .get('/logout', (req, res) => {
    res.clearCookie('session');
    res.send({ logout: true });
  });
