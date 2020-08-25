require('dotenv').config();
require('../data-helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

const Game = require('../lib/models/Game');
const { prepare, agent } = require('../data-helpers/data-helpers');


describe('game routes', () => {
  
  it('gets a list of all games', async() => {
    const games = prepare(await Game.find());

    return agent
      .get('/api/v1/games')
      .then(res => {
        expect(res.body).toEqual(games);
      });
  });
});
