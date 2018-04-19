const {load} = require('./util')


function listTagsCmd() {
    const tags = listTags();
    
    console.log(tags.join('\n'));
}

function listTags(data = load()) {
    const tags = [];

    data.streamers.forEach(streamer => {
        streamer.tags.forEach(tag => {
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        });
    });
    return tags;
}
module.exports.listTags = listTags;

module.exports.cmd = function (cmd) {
    cmd.command('list-tags')
        .description('List all tags')
        .action(listTagsCmd);
}