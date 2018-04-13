const fs = require('fs');
const outdent = require('outdent');

const {load} = require('./util')

const usedHeaders = [];

function render({ outputFile }) {
    const json = load();
    const header = fs.readFileSync('res/readme_header.md');
    const toc = renderTableOfContent(json);
    const body = renderBody(json);
    console.log(outputFile)
    fs.writeFileSync(outputFile, header + toc + '\n' + body);
}

function renderTableOfContent(json) {
    const header = '## Table of Contents\n';
    const toc = json.streamers.map(renderTocEntry).join('\n');
    return header + toc + '\n';

}
function renderTocEntry(s) {
    const url = slugify(s.name);
    return `- [${s.name}](#${url}) - **streaming:** ${s.tags.join(', ')}`;
}

function renderBody(json) {
    const header = '## Developers That Stream\n\n';
    return header + json.streamers.map(renderStreamer).join('\n') + '\n';
}

function renderStreamer(s) {
    return outdent`
    ### ${s.name}
    #### What ${s.name} Streams
    - ${s.tags.join(', ')}
    #### Streaming on:
    ${renderStreams(s.streams)}
    #### Links:
    ${renderLinks(s.links)}
    `;
}

function renderStreams(streams) {
    return streams.map(s => `- [${s.name}](${s.url})`).join('\n');
}

function renderLinks(links) {
    return links.map(l => `- [${l.text}](${l.url})`).join('\n');
}

function slugify(val) {
    var anchor = val.trim().toLowerCase().replace(/[^\w\- ]+/g, ' ').replace(/\s+/g, '-').replace(/\-+$/, '');
    if (usedHeaders.indexOf(anchor) !== -1) {
        var i = 1;
        while (usedHeaders.indexOf(anchor + '-' + i) !== -1 && i++ <= 10);
        anchor = anchor + '-' + i;
    }
    usedHeaders.push(anchor);
    return anchor
}

module.exports = function (cmd) {
    cmd.command('render')
        .description('Render the data to a markdown file')
        .option('-o, --output-file <filename>', 'Set custom filename', 'README_.md')
        .action(render);
}