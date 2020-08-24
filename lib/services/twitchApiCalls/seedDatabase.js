require('dotenv').config();
const connect = require('../../utils/connect');
const Game = require('../../models/Game');
const { createGames } = require('../../utils/seedDatabaseHelpers/helperFunctions');
const { getGameDrops, cursors } = require('../twitchApiCalls/getTwitchGamesWithDrops');
const { getStreamersName } = require('../twitchApiCalls/getStreamerNames');

connect();

function seedDatabase(cursors) {
  return getGameDrops(cursors)
    .then(res => {
      //will need to add in something to drop collection here
      Game.collection.drop();
      //this creates all games with drops in database
      createGames(res);
      // call next api
      getStreamersName(res);
    });
}

seedDatabase(cursors);
