const fs = require('fs');
const program = require('commander');

const add = require('./src/add');
const check = require('./src/check');
const render = require('./src/render');
const listTags = require('./src/listtags');
const interactive = require('./src/interactive');


add(program);
check(program);
render(program);
listTags(program);
interactive(program);

program.parse(process.argv);

// No command specified
if (program.args.length === 0) {
  program.help();
}