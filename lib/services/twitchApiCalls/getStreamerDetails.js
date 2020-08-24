const request = require('superagent');

const getStreamerAllDetails = (data) => {
  return Promise.all(Object.entries(data).map(([gameName, streamerNames]) => {
    return Promise.all([gameName, 
      getStreamerDetails(streamerNames)]);
  }))
    .then(array => array.flat())
    .then(array => array.filter(item => {
      return item === typeof('string') || item.length > 1;
    })
      .filter((item, i, array) => {
        if(typeof array[i + 1] !== 'string' || Array.isArray(item)) return item;
      })
      .map((item, i, array) => {
        if(typeof array[i] === 'string') return { gameTitle: item, streamers: array[i + 1].filter(item => item.length > 0).flat() };
      })
      .filter(item => typeof item === 'object')
    );
};
function getStreamerDetails(streamerNames) {
  return Promise.all(streamerNames.map(streamerName => getStreamersInformation(streamerName.loginName)));
}
function getStreamersInformation(streamerLogin) {
  return request.get(`https://api.twitch.tv/helix/streams?user_login=${streamerLogin}`)
    .set ({
      'Client-ID' : 'sa1nzoqk8wbkgwtqmlazbpf82sb84k',
      'Authorization': 'Bearer y8u1rjycjgxd0doat4n1ui4saswjls'
    })
    .retry(3)
    .then(res => JSON.parse(res.text))
    .then(res => 
      (res.data.map(({ user_id, user_name, title, viewer_count }) => ({
        userId: user_id,
        userName: user_name,
        title,
        viewer_count
      }))));
}

module.exports = {
  getStreamerAllDetails
};
