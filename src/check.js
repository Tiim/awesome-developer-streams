const Validator = require('jsonschema').Validator;
const v = new Validator();

const { load } = require('./util')

const schema = {
    id: '/Root',
    type: 'object',
    properties: {
        streamers: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    streams: {
                        type: 'array',
                        items: {
                            id: 'stream-object',
                            type: 'object',
                            properties: {
                                url: { type: 'string' },
                                name: { type: 'string' }
                            },
                            required: ['url', 'name']
                        }
                    },
                    tags: {
                        type: 'array',
                        items: { type: 'string' }
                    },
                    langs: {
                        type: 'array',
                        items: { type: 'string' }
                    },
                    links: {
                        type: 'array',
                        items: {
                            id: 'links-object',
                            type: 'object',
                            properties: {
                                url: { type: 'string' },
                                text: { type: 'string' }
                            },
                            required: ['url', 'text']
                        }
                    },
                    added: { type: 'string' },
                    modified: { type: 'string' },
                },
                required: ['name', 'streams', 'tags', 'links', 'added', 'modified']
            }
        }
    },
    reqired: ['streamers']
}

function check() {
    const data = load();
    const val = v.validate(data, schema);
    if (val.errors.length) {
        val.errors.forEach(e => console.error(e.stack));
        process.exit(1);
    }
}

module.exports = function (cmd) {
    cmd.command('check')
        .description('Check if data.json is valid')
        .action(check);
}