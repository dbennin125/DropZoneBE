require('dotenv').config();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Game');

describe('auth routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets a list of all games', async() => {
    await Game.create([
      {
        'gameId': '512710',
        'title': 'Call of Duty: Modern Warfare',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./Call%20of%20Duty:%20Modern%20Warfare-285x380.jpg'
      },
      {
        'gameId': '518306',
        'title': 'Hyper Scape',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/Hyper%20Scape-285x380.jpg'
      },
      {
        'gameId': '460630',
        'title': 'Tom Clancy\'s Rainbow Six: Siege',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./Tom%20Clancy%27s%20Rainbow%20Six:%20Siege-285x380.jpg'
      },
      {
        'gameId': '514194',
        'title': 'Rogue Company',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/Rogue%20Company-285x380.jpg'
      },
      {
        'gameId': '27546',
        'title': 'World of Tanks',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Tanks-285x380.jpg'
      },
      {
        'gameId': '32502',
        'title': 'World of Warships',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Warships-285x380.jpg'
      },
      {
        'gameId': '497697',
        'title': 'Last Day On Earth: Survival',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./Last%20Day%20On%20Earth:%20Survival-285x380.jpg'
      },
      {
        'gameId': '493217',
        'title': 'Gwent: The Witcher Card Game',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./Gwent:%20The%20Witcher%20Card%20Game-285x380.jpg'
      },
      {
        'gameId': '115977',
        'title': 'The Witcher 3: Wild Hunt',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./The%20Witcher%203:%20Wild%20Hunt-285x380.jpg'
      },
      {
        'gameId': '488634',
        'title': 'Don\'t Starve Together',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/Don%27t%20Starve%20Together-285x380.jpg'
      },
      {
        'gameId': '491403',
        'title': 'Eternal',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/Eternal-285x380.jpg'
      },
      {
        'gameId': '491289',
        'title': 'Infestation: The New Z',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./Infestation:%20The%20New%20Z-285x380.jpg'
      },
      {
        'gameId': '494327',
        'title': 'Minion Masters',
        'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/Minion%20Masters-285x380.jpg'
      }
    ])
      .then(() => request(app) .get('/api/v1/games/'))
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining(
          [
            {
              _id: expect.anything(),
              'gameId': 512710,
              'title': 'Call of Duty: Modern Warfare',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./Call%20of%20Duty:%20Modern%20Warfare-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 518306,
              'title': 'Hyper Scape',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/Hyper%20Scape-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 460630,
              'title': 'Tom Clancy\'s Rainbow Six: Siege',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./Tom%20Clancy%27s%20Rainbow%20Six:%20Siege-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 514194,
              'title': 'Rogue Company',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/Rogue%20Company-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 27546,
              'title': 'World of Tanks',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Tanks-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 32502,
              'title': 'World of Warships',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/World%20of%20Warships-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 497697,
              'title': 'Last Day On Earth: Survival',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./Last%20Day%20On%20Earth:%20Survival-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 493217,
              'title': 'Gwent: The Witcher Card Game',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./Gwent:%20The%20Witcher%20Card%20Game-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 115977,
              'title': 'The Witcher 3: Wild Hunt',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./The%20Witcher%203:%20Wild%20Hunt-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 488634,
              'title': 'Don\'t Starve Together',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/Don%27t%20Starve%20Together-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 491403,
              'title': 'Eternal',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/Eternal-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 491289,
              'title': 'Infestation: The New Z',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/./Infestation:%20The%20New%20Z-285x380.jpg'
            },
            {
              _id: expect.anything(),
              'gameId': 494327,
              'title': 'Minion Masters',
              'imageUrl': 'https://static-cdn.jtvnw.net/ttv-boxart/Minion%20Masters-285x380.jpg'
            }
          ]
        ));
      });
  });


 
});
