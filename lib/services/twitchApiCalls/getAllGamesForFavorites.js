//DO NOT RUN THIS MULTIPLE TIMES.
const request = require("superagent");

const cursors = [
  "eyJzIjowLCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjo5OSwiZCI6ZmFsc2UsInQiOnRydWV9",
  "eyJzIjoxOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
  "eyJzIjoyOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
  "eyJzIjozOTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
  "eyJzIjo0OTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
  "eyJzIjo1OTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
  "eyJzIjo2OTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
  "eyJzIjo3OTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
  "eyJzIjo4OTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
  "eyJzIjo5OTksImQiOmZhbHNlLCJ0Ijp0cnVlfQ==",
  "eyJzIjoxMDk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoxMTk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoxMjk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoxMzk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoxNDk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoxNTk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoxNjk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoxNzk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoxODk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoxOTk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoyMDk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoyMTk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoyMjk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoyMzk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoyNDk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoyNTk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoyNjk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoyNzk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoyODk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
  "eyJzIjoyOTk5LCJkIjpmYWxzZSwidCI6dHJ1ZX0=",
];

function getAllGames(cursor) {
  return request
    .post("https://gql.twitch.tv/gql")
    .send(JSON.stringify(body(cursor)))
    .set({
      "Content-Type": "text/plain",
      "Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
      "User-Agent": "batman",
    })
    .then((res) => JSON.parse(res.text))
    .then((item) => {
      // return console.log(item.map(console.log));
      return item[0].data.directoriesWithTags["edges"].map(
        ({ node: { id, name, avatarURL } }) => {
          return {
            id,
            name,
            imageUrl: avatarURL,
          };
        }
      );
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

getAllGames(cursors);
