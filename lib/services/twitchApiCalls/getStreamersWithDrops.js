const request = require("superagent");

const mapVerifiedStreamers = (newData) => {
  return Promise.all(
    Object.entries(newData).map(([gameName, streamers]) => {
      return Promise.all([gameName, filterUsersWithVerifiedDrops(streamers)]);
    })
  )
    .then(filterEmptyGames)
    .then(Object.fromEntries)
    .then((array) => array);
};

function filterUsersWithVerifiedDrops(streamerNames) {
  return Promise.all(
    streamerNames.map((streamerName) => getVerifiedDrops(streamerName))
  )
    .then((streamers) => streamers.filter((streamer) => streamer.hasDrops))
    .then((res) => res.filter((stream) => stream.streamDropsInfo));
}

function getVerifiedDrops(streamerName) {
  return request
    .post("https://gql.twitch.tv/gql")
    .send(JSON.stringify(body(streamerName)))
    .set({
      "Content-Type": "text/plain",
      "Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
      "User-Agent": "batman",
    })
    .retry(3)
    .then((res) => JSON.parse(res.text))
    .then(([{ data }]) => ({
      loginName: data.user.login,
      streamDropsInfo: data.user.stream.isStreamDropsEnabled || null,
      hasDrops: userHasDrops(data),
    }));
}

function userHasDrops(userData) {
  return userData.user.lastBroadcast?.game?.activeDropCampaigns.some(
    (campaign) =>
      campaign.isAvailableToAllChannels ||
      campaign.applicableChannels.find(
        (channel) => channel.id === userData.user.id
      )
  );
}

function filterEmptyGames(gamesWithDrops) {
  return gamesWithDrops.filter(([, usersWithDrops]) => {
    return usersWithDrops.length > 0;
  });
}

function body(streamerName) {
  return [
    {
      operationName: "Drops_ChannelDrops_User",
      variables: { login: `${streamerName}`, isLoggedIn: false },
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash:
            "f309b1d517d288074d50d96512059857cc67d8905d1379e414d70f7b981f2618",
        },
      },
    },
  ];
}


module.exports = {
  mapVerifiedStreamers,
};
