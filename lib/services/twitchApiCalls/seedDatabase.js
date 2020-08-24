require('dotenv').config();
const connect = require('../../utils/connect');
const { createGames } = require('../../utils/seedDatabaseHelpers/helperFunctions');
const { getGameDrops, cursors } = require('../twitchApiCalls/getTwitchGamesWithDrops');

connect();

function seedDatabase(cursors) {
  return getGameDrops(cursors)
    .then(res => {
      //will need to add in something to drop collection here

      //this creates all games with drops in database
      createGames(res);

    });

}

seedDatabase(cursors);
