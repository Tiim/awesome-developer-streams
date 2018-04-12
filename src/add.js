const {collect, links} = require('./argsfunc');

const services = [
    { pattern: 'twitch.tv', name: 'Twitch' },
    { pattern: 'youtube.com', name: 'Youtube'},
    { pattern: 'mixer.com', name: 'Mixer'}
]


function add(data) {
    return function(cmd) {
        if (!cmd.streamerName) {
            //TODO: interactive version
        } else {
            const newEntry = {
                name: cmd.streamerName,
                streams: getStreams(cmd.stream || []),
                topics: cmd.topic || [],
                links: cmd.link || [],
                added: new Date(),
                modified: new Date()
            }
            data.streamers.push(newEntry);
        }
    }
}

function getStreams(urls) {
    const obj = urls.map(url => ({ 
        url,
        name: services.find(s => url.includes(s.pattern)).name || url
    }));
    obj.filter( ({url, name}) => url == name).forEach(e => {
        console.log("Warning: streaming provider " + url + " can't be found, please file an issue for that");
    });
    return obj; 
}


module.exports = function (cmd, json) {
    cmd.command('add')
        .description('Add a streamer to the list')
        .option('-n, --streamer-name [name]', 'Set the name of the streamer')
        .option('-s, --stream [stream-link]', 'Set the link of the stream, can be set multiple times', collect, [])
        .option('-l, --link [link]', 'Set a link to e.g. social media in the format Link-Text,https://example.com, can be set multiple times', links, [])
        .option('-t, --topic [stream-topics]', 'Set the "What this streamer streams" value. can be set multiple times', collect, [])
        .action(add(json));
}