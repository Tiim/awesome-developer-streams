const fs = require('fs');

const services = [
    { pattern: 'twitch.tv', name: 'Twitch' },
    { pattern: 'youtube.com', name: 'Youtube'},
    { pattern: 'mixer.com', name: 'Mixer'}
]

const filename = 'data.json'

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