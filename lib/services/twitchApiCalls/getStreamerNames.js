const fs = require('fs');
const request = require('superagent');

const getGameNames = (gameArray) => {
  return gameArray.map(item => item.name);
};

// const games = getGameNames(newData);
  
const getStreamersName = (newData) => {
  const games = getGameNames(newData);
  return Promise.all(games.map(name => getGameStreamers(name)))

    .then((gameStreamers) => {
      return Object.fromEntries(gameStreamers.map((streamers, i) => [
        games[i],
        streamers
      ])
      );
    })
    .then(array => fs.writeFileSync('gumtree6.json', JSON.stringify(array, null, 2)));
};
  
function getGameStreamers(game) {
  return request.post('https://gql.twitch.tv/gql')
    .send(JSON.stringify(body(game)))
    .set ({
      'Content-Type': 'text/plain',
      'Client-Id': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
      'User-Agent': 'superman'
    })
    .then(res => JSON.parse(res.text))
    .then(item => {
      return (item[0].data.game.streams['edges'].map(item => item.node.broadcaster.login));
    });
}
  
function body(gameName) {
  return [{ 'operationName':'DirectoryPage_Game', 'variables':{ 'name':`${gameName}`, 'options':{ 'sort':'RELEVANCE', 'recommendationsContext':{ 'platform':'web' }, 'requestID':'JIRA-VXP-2397', 'tags':[] }, 'sortTypeIsRecency':false, 'limit':100 }, 'extensions':{ 'persistedQuery':{ 'version':1, 'sha256Hash':'5feb6766dc5d70b33ae9a37cda21e1cd7674187cb74f84b4dd3eb69086d9489c' } } }];
}

// getStreamersName(newData);

module.exports = {
  getStreamersName
};
