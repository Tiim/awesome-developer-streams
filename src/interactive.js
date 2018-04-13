const inquirer = require('inquirer');

const { streamName, load, save } = require('./util');

const add = require('./interactive/add');





async function interactive(cmd) {
    const data = load();
    while (true) {
        const { mode } = await inquirer.prompt({
            name: 'mode',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                { name: 'Add a streamer to the list', value: add },
                { name: 'Quit', value: 'quit' }
            ]
        })
        if (mode == 'quit') {
            save(data);
            return;
        } else {
            await mode(data);
        }
    }
}


module.exports = function (cmd) {
    cmd.command('interactive')
        .description('Launches the interactive mode')
        .action(interactive);
}