const request = require("superagent");

const getGameNames = (gameArray) => {
  return gameArray.map((item) => item.name);
};

const getStreamersName = (newData) => {
  const games = getGameNames(newData);
  return Promise.all(games.map((name) => getGameStreamers(name))).then(
    (gameStreamers) => {
      return Object.fromEntries(
        gameStreamers.map((streamers, i) => [games[i], streamers])
      );
    }
  );
};

function getGameStreamers(game) {
  return request
    .post("https://gql.twitch.tv/gql")
    .send(JSON.stringify(body(game)))
    .set({
      "Content-Type": "text/plain",
      "Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
      "User-Agent": "batman",
    })
    .retry(3)
    .then((res) => JSON.parse(res.text))
    .then((item) => {
      return item[0].data.game.streams["edges"].map(
        (item) => item.node.broadcaster.login
      );
    });
}

function body(gameName) {
  return [
    {
      operationName: "DirectoryPage_Game",
      variables: {
        name: `${gameName}`,
        options: {
          sort: "VIEWER_COUNT",
          recommendationsContext: { platform: "web" },
          requestID: "JIRA-VXP-2397",
          tags: [],
        },
        sortTypeIsRecency: false,
        limit: 100,
      },
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash:
            "5feb6766dc5d70b33ae9a37cda21e1cd7674187cb74f84b4dd3eb69086d9489c",
        },
      },
    },
  ];
}

module.exports = {
  getStreamersName,
};
