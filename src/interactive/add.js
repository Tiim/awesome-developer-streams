const inquirer = require('inquirer');

const { streamName } = require('../util');

module.exports = async function add(data) {
    const name = await getName();
    const streams = await getStreams(name);
    const tags = await gatTags(name);
    const links = await getLinks(name);
    console.log('New streamer');
    console.log('Name: \n', name);
    console.log('Streams: \n', streams.map((s) => `${s.name}: ${s.url}`).join('\n'));
    console.log('Tags: \n', tags.join(', '));
    console.log('Links: \n', links.map((l) => `${l.text}: ${l.url}`).join('\n'));
    data.streamers.push({
        name,
        streams,
        tags,
        links,
        added: new Date(),
        modified: new Date()
    })
}

async function getName() {
    const { name } = await inquirer.prompt({
        name: 'name', type: 'input', message: 'Whats the name of the streamer?',
        validate: (input) => input? true : 'The name is required!'
    });
    return name;
}

async function getStreams(name) {
    const streamsTmp = [];
    while (true) {
        const { stream } = await inquirer.prompt({
            name: 'stream', type: 'input', message: `Where does ${name} stream on? (Enter stream url) ${skipStr(streamsTmp)}`,
            validate: (input) => (input || streamsTmp.length)? true : 'At least one stream url must be provided' 
        });
        if (stream) {
            streamsTmp.push(stream);
        } else {
            break;
        }
    }
    return streamName(streamsTmp);
}

async function gatTags(name) {
    const tags = [];
    while (true) {
        const { tag } = await inquirer.prompt({
            name: 'tag', type: 'input', message: `What does ${name} stream about? Enter only one tag at a time. ${skipStr(tags)}`,
            validate: (input) => (input || tags.length) ? true : 'At least one tag must be provided'
        });
        if (tag) {
            tags.push(tag);
        } else {
            break;
        }
        
    }
    return tags;
}

async function getLinks(name) {
    const links = [];
    while (true) {
        const { url } = await inquirer.prompt({
            name: 'url', type: 'input', message: 'What urls do you want to add? Enter url. leave empty to skip'
        });
        if (!url) {
            break;
        }
        const { name } = await inquirer.prompt({
            name: 'name', type: 'input', message: `What's the name of this url? For example 'Twitter' or 'Website', leave empty to skip`
        });
        links.push({ url, text: name || url });
    }
    return links;
}

function skipStr(arr) {
    return arr.length? 'leave empty to skip': '';
}