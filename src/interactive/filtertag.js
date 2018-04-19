const inquirer = require('inquirer');

const { listTags } = require('../listtags');
const { load } = require('../util')



module.exports = async function (data) {
    const tags = listTags(data);
    const { selected } = await inquirer.prompt({
        name: 'selected', type: 'checkbox', message: 'Select tags you want to query',
        choices: tags, pageSize: 7,
        validate: (s) => s.length >=1 ? true : 'Select at least one tag!'
    });
    const res = data.streamers.filter( s => s.tags.some(v => selected.indexOf(v) >= 0));
    console.log('The following streamers matched your query:');
    console.log(res.map(s => s.name).join('\n'));
}