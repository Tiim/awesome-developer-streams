const fs = require('fs');
const { render } = require('../render');

module.exports = async function (data) {
    const string = render();
    fs.writeFileSync('_README.md', string);
    console.log('Done');
}