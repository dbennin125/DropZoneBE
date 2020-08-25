require('../../utils/connect');
const Game = require('../../models/Game');
const Stream = require('../../models/Stream');

function createGames(array) {
  return Promise.all(array.map(({ name, id, imageUrl }) => {
    return Game.create({
      title: name,
      imageUrl,
      gameId: id
    });
  })
  );
}

function createStreamers(array) {
  return Stream.create(array.flatMap(({ gameTitle, streamers }) => 
    streamers.map(({ image, userId, userName, title, viewer_count }) => ({
      image,
      gameTitle,
      streamerName: userName,
      streamTitle: title,
      streamerId: userId,
      viewerCount: viewer_count,
    }))
  ));
}

module.exports = {
  createGames,
  createStreamers
};
