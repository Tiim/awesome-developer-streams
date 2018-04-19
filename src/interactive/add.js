const inquirer = require('inquirer');

const { streamName } = require('../util');

module.exports = async function add(data) {
    const name = await getName();
    const streams = await getStreams();
    const tags = await gatTags();
    const links = await getLinks();
    const langs = await getLangs();
    data.streamers.push({
        name,
        streams,
        tags,
        links,
        langs,
        added: new Date(),
        modified: new Date()
    })
    console.log('Done');
}

async function getName() {
    const { name } = await inquirer.prompt({
        name: 'name', type: 'input', message: 'Enter the name of the streamer: ',
        validate: (input) => input ? true : 'The name is required!'
    });
    return name.trim();
}

async function getStreams() {
    const streamsTmp = [];
    while (true) {
        const { stream } = await inquirer.prompt({
            name: 'stream', type: 'input', message: `Enter stream url${skipStr(streamsTmp)}:`,
            validate: (input) => (input || streamsTmp.length) ? true : 'At least one stream url must be provided'
        });
        if (stream) {
            streamsTmp.push(stream.trim());
        } else {
            break;
        }
    }
    return streamName(streamsTmp);
}

async function gatTags() {
    const tags = [];
    while (true) {
        const { tag } = await inquirer.prompt({
            name: 'tag', type: 'input', message: `Enter tags${skipStr(tags)}:`,
            validate: (input) => (input || tags.length) ? true : 'At least one tag must be provided'
        });
        if (tag) {
            const t = tag.split(',').map(t => t.trim());
            tags.push(...t);
            if (t.length) {
                break;
            }
        } else {
            break;
        }

    }
    return tags;
}

async function getLinks() {
    const links = [];
    while (true) {
        const { url } = await inquirer.prompt({
            name: 'url', type: 'input', message: 'Enter link url (empty to skip):'
        });
        if (!url) {
            break;
        }
        const { name } = await inquirer.prompt({
            name: 'name', type: 'input', message: `Enter url text (empty to skip):`,
            default: guessLinkText(url)
        });
        links.push({ url, text: name || url });
    }
    return links;
}

async function getLangs() {
    const { lang } = await inquirer.prompt({
        name: 'lang', type: 'input', message: `Enter spoken languages (comma separated):`,
        default: 'English'
    });
    return lang.split(',').map(l=>l.trim());
}

const linkText = [
    { pattern: 'twitter.com', name: 'Twitter' },
    { pattern: 'patreon.com', name: 'Patreon' },
    { pattern: 'github.com', name: 'GitHub' },
    { pattern: 'medium.com', name: 'Medium' },
    { pattern: 'youtube.com', name: 'YouTube' },
    { pattern: 'instagram.com', name: 'Instagram' },
    { pattern: 'discord', name: 'Discord' },
    { pattern: 'bitbucket.org', name: 'BitBucket' },
    { pattern: 'tinyletter.com', name: 'Newsletter' },
    { pattern: 'facebook.com', name: 'FaceBook' },
    { pattern: 'linkedin.com', name: 'LinkedIn' },
    { pattern: 'plus.google.com', name: 'Google+' },
    { pattern: 'blog', name: 'Blog' },
    { pattern: 'forum', name: 'Forum' },
]

function guessLinkText(url) {
    const result = linkText.find(l => url.toLowerCase().indexOf(l.pattern) != -1);
    if (result) {
        return result.name;
    } else {
        return 'Website';
    }
}

function skipStr(arr) {
    return arr.length ? ' (empty to skip)' : '';
}