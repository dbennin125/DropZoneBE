require("dotenv").config();
const connect = require("../../utils/connect");
const Game = require("../../models/Game");
const {
  createGames,
  createStreamers,
} = require("../../utils/seedDatabaseHelpers/helperFunctions");
const {
  getGameDrops,
  cursors,
} = require("../twitchApiCalls/getTwitchGamesWithDrops");
const { getStreamersName } = require("../twitchApiCalls/getStreamerNames");
const {
  mapVerifiedStreamers,
} = require("../twitchApiCalls/getStreamersWithDrops");
const { getStreamerAllDetails } = require("./getStreamerDetails");
const Stream = require("../../models/Stream");
const mongoose = require("mongoose");

connect();

function seedDatabase(cursors) {
  return (
    getGameDrops(cursors)
      .then(async (res) => {
        await Game.collection.drop().catch(() => {});
        //this creates all games with drops in database
        await createGames(res);
        // call next api to get streamer names
        return getStreamersName(res);
      })
      //plug streamer names into 3rd api call to check if drops are available
      .then(mapVerifiedStreamers)

      //get streamer details
      .then(getStreamerAllDetails)
      .then(async (res) => {
        await Stream.collection.drop().catch(() => {});
        return createStreamers(res);
      })
  );
}

seedDatabase(cursors)
  // eslint-disable-next-line no-console
  .then(() => console.log("Seeded!"))
  .finally(() => mongoose.connection.close());
