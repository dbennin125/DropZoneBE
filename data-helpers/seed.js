const chance = require('chance').Chance();
const Game = require('../lib/models/Game');
const User = require('../lib/models/User');
const Stream = require('../lib/models/Stream');

module.exports = async({ games = 20, users = 5, streamers = 50, } = {}) => {
  
  await User.create([...Array(users)].map((_, i) => ({
    email: `test${i}@test.com`,
    password: 'pass1234',
    userImage: chance.url()
  })));
  
  const createdGame =
  await Game.create([...Array(games)].map(() => ({
    title: `${chance.profession()} ${chance.animal()}`,
    imageUrl: chance.url(),
    gameId: chance.natural({ min: 1, max: 50 }),
  })));

  await Stream.create([...Array(streamers)].map(() => ({
    game: chance.pickone(createdGame)._id,
    streamerName: `${chance.profession()} ${chance.animal()}`,
    streamTitle: `${chance.province()} ${chance.name()}`,
    streamImage: chance.url(),
    streamerId: chance.natural({ min: 1, max: 59 }),
    viewerCount: chance.natural({ min: 1, max: 100 }),
    streamUrl: chance.url()
  })));


};
