const inquirer = require('inquirer');

const { streamName, load, save } = require('./util');

const add = require('./interactive/add');
const render = require('./interactive/render');
const filtertag = require('./interactive/filtertag');




async function interactive(cmd) {
    const data = load();
    while (true) {
        const { mode } = await inquirer.prompt({
            name: 'mode',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                { name: 'Add a streamer to the list', value: add },
                { name: 'Update README.md', value: render},
                { name: 'Filter streamers by tag', value: filtertag},
                { name: 'Quit', value: 'quit' }
            ]
        })
        if (mode == 'quit') {
            return;
        } else {
            await mode(data);
            save(data);
        }
    }
}


module.exports.cmd = function (cmd) {
    cmd.command('interactive')
        .description('Launches the interactive mode')
        .action(interactive);
}