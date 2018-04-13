const fs = require('fs');

const services = [
    { pattern: 'twitch.tv', name: 'Twitch' },
    { pattern: 'youtube.com', name: 'Youtube'},
    { pattern: 'mixer.com', name: 'Mixer'},
    { pattern: 'facebook.com', name: 'Facebook' },
    { pattern: 'air.mozilla.org', name: 'Air Mozilla' },
]

const filename = 'data.json'
const sortBy = 'added' //other option: modified

function sort(json) {
    const arr = json.streamers;
    arr.sort(compare);
}

function compare(a,b) {
    d1 = new Date(a[sortBy]);
    d2 = new Date(b[sortBy]);
    if (d1 < d2)
      return -1;
    if (d1 > d2)
      return 1;
    return 0;
  }

module.exports.streamName = function (urls) {
    const obj = urls.map(url => ({ 
        url,
        name: services.find(s => url.includes(s.pattern))? services.find(s => url.includes(s.pattern)).name : url
    }));
    obj.filter( ({url, name}) => url == name).forEach(e => {
        console.log(`Warning: Streaming service for '${e.url}' is not registered, please file an issue for that`);
    });
    return obj; 
}

module.exports.save = function (json) {
    sort(json);
    fs.writeFileSync(filename, JSON.stringify(json, null, 4));
}

module.exports.load = function () {
    if (!fs.existsSync(filename)) {
        console.log('no data.json file found');
        return {
            streamers: []
        };
    }
    const rawdata = fs.readFileSync(filename);  
    return JSON.parse(rawdata); 
}