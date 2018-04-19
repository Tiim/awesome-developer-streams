const fs = require('fs');
const outdent = require('outdent');

const {load} = require('./util')

const usedHeaders = [];

function renderCnd({ outputFile }) {
    const string = render();
    fs.writeFileSync(outputFile, string)
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
    return header + json.streamers.map(renderStreamer).join('\n\n') + '\n';
}

function renderStreamer(s) {
    return outdent`
    ### ${s.name}
    #### What ${s.name} Streams
    - ${s.tags.join(', ')}
    #### Streaming on:
    ${renderStreams(s.streams)}
    ${renderLanguages(s.langs)}
    #### Links:
    ${renderLinks(s.links)}
    `;
}

function renderLanguages(array) {
    if (array.length === 1 && array[0] === 'English') {
        return '';
    } else {
        return outdent`
        #### Languages Spoken During Stream
        ${array.map(l => `- ${l}`)}
        `;
    }
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

function render(data = load()) {
    const header = fs.readFileSync('res/readme_header.md');
    const toc = renderTableOfContent(data);
    const body = renderBody(data);

    const string = header + toc + '\n' + body;
    return string;
}
module.exports.render = render;

module.exports.cmd = function (cmd) {
    cmd.command('render')
        .description('Render the data to a markdown file')
        .option('-o, --output-file <filename>', 'Set custom filename', 'README_.md')
        .action(render);
}