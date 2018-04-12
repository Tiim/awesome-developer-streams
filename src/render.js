const fs = require('fs');

function render(json) {
    return function render({outputFile}) {
        const header = fs.readFileSync('res/readme_header.md');
        const body = renderBody(json);
        console.log(outputFile)
        fs.writeFileSync(outputFile, header + body);
    }
}

function renderBody(json) {
    return json.streamers.map(renderStreamer).join('\n');
}

function renderStreamer(s) {
    return s.name;
}


module.exports = function (cmd, json) {
    cmd.command('render')
        .description('Add a streamer to the list')
        .option('-o, --output-file [filename]', 'Set custom filename', 'README_.md')
        .action(render(json));
}