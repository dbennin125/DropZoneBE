require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');
const seed = require('./seed');
const Game = require('../lib/models/Game');


beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

  
beforeEach(() => {
  return seed();
});
    
const agent = request.agent(app);
beforeEach(() => {
  return agent
    .post('/api/v1/auth/login')
    .send({
      email: 'test0@test.com',
      password: 'pass1234'
    });
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepareOne = model => JSON.parse(JSON.stringify(model));
const prepareMany = models => models.map(prepareOne);

const prepare = model => {
  if(Array.isArray(model)) return prepareMany(model);
  return prepareOne(model);
};

const getOneGame = () => Game.findOne();
const getLoggedInUser = () => User.findOne({ email: 'test0@test.com' });

module.exports = {
  prepare,
  agent,
  getLoggedInUser,
  getOneGame
};
