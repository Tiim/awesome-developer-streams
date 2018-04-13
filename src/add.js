const { collect, links } = require('./argsfunc');
const { streamName, load, save } = require('./util');


function add(cmd) {
    const data = load();
    
    if(!cmd.streamerName) {
        console.log('  error: --streamer-name <name> is required');
        return;
    }
    if(!cmd.stream || !cmd.stream.length) {
        console.log('  error: --stream <url> is required at least once');
        return;
    }
    if(!cmd.tag || !cmd.tag.length) {
        console.log('  error: --tag <stream-tag> is required at least once');
        return;
    }
    if (!cmd.lang || !cmd.lang.length) {
        cmd.lang = ['English']
    }

    const newEntry = {
        name: cmd.streamerName,
        streams: streamName(cmd.stream || []),
        tags: cmd.tag || [],
        links: cmd.link || [],
        langs: cmd.lang,
        added: new Date(),
        modified: new Date()
    }
    data.streamers.push(newEntry);
    save(data);
}


module.exports = function (cmd) {
    cmd.command('add')
        .description('Add a streamer to the list')
        .option('-n, --streamer-name <name>', 'Set the name of the streamer (required)')
        .option('-s, --stream <url>', 'Set the link of the stream, can be set multiple times (at least one required)', collect, [])
        .option('-l, --link <link>', 'Set a link to e.g. social media in the format Link-Text,https://example.com, can be set multiple times', links, [])
        .option('-t, --tag <stream-tag>', 'Set the "What this streamer streams" value. can be set multiple times (at least one required)', collect, [])
        .option('-g, --lang <language>', 'Add a stream language, can be set multiple times, default: English', collect, [])
        .action(add);
}