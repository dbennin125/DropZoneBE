require('../../utils/connect');
const Game = require('../../models/Game');

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

module.exports = {
  createGames
};
