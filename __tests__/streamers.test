require('dotenv').config();
require('../data-helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const Stream = require('../lib/models/Stream');
const { prepare, agent, getOneGame } = require('../data-helpers/data-helpers');

describe('auth routes', () => {
  
  it('gets all streamers', async() => {
    const oneGame = prepare(await getOneGame());
    const streams = prepare(await Stream.find({ game: oneGame._id }));

    return agent
      .get(`/api/v1/streams/game/${oneGame._id}`)
      .then(res => {
        expect(res.body).toEqual(streams);
      });
  });
});
