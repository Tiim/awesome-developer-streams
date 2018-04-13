const {load} = require('./util')


function listTags() {
    const data = load();

    const tags = [];

    data.streamers.forEach(streamer => {
        streamer.tags.forEach(tag => {
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        });
    });
    
    console.log(tags.join('\n'));
}

module.exports = function (cmd) {
    cmd.command('list-tags')
        .description('List all tags')
        .action(listTags);
}