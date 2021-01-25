const request = require("superagent");

const cursors = [
  "eyJzIjowLCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjo5OSwiZCI6ZmFsc2UsInQiOnRydWV9",
  "eyJzIjoxOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
  "eyJzIjoyOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
];

const getGameDrops = (cursors) => {
  return Promise.all(
    [...Array(cursors.length)].map((_, i) => getGames(cursors[i]))
  ).then((array) => array.flat());
  // fs.writeFileSync('allGamesWithDrops.json', JSON.stringify(array.flat(), null, 2)));
};

function getGames(cursor) {
  return request
    .post("https://gql.twitch.tv/gql")
    .send(JSON.stringify(body(cursor)))
    .set({
      "Content-Type": "text/plain",
      "Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
      "User-Agent": "batman",
    })
    .retry(3)
    .then((res) => JSON.parse(res.text))
    .then((item) => {
      return item[0].data.directoriesWithTags["edges"]
        .filter((item) => item.node.activeDropCampaigns.length > 0)
        .map(({ node: { id, name, avatarURL } }) => {
          return {
            id,
            name,
            imageUrl: avatarURL,
          };
        });
    });
}

function body(cursor) {
  return [
    {
      operationName: "BrowsePage_AllDirectories",
      variables: {
        limit: 100,
        options: {
          recommendationsContext: { platform: "web" },
          requestID: "JIRA-VXP-2397",
          sort: "VIEWER_COUNT",
          tags: [],
        },
        cursor: `${cursor}`,
      },
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash:
            "78957de9388098820e222c88ec14e85aaf6cf844adf44c8319c545c75fd63203",
        },
      },
    },
  ];
}

getGameDrops(cursors);

module.exports = {
  getGameDrops,
  cursors,
};
