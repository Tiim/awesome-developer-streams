const { check } = require('../check');

module.exports = async function (data) {
    const errors = check(data);
    if (errors.length === 0) {
        console.log('Everything is okey');
    } else {
        console.log('Found errors');
        console.log(errors.join('\n'));
    }
}