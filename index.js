const fs = require('fs');
const program = require('commander');

const add = require('./src/add');
const render = require('./src/render');


const jsonFile = 'data.json';
const data = initJsonFile(jsonFile);

add(program, data);
render(program, data);

program.parse(process.argv);
saveJsonFile(jsonFile, data);




function initJsonFile(filename) {
    if (!fs.existsSync(filename)) {
        console.log('no data.json file found');
        return {
            streamers: []
        }
    }
    let rawdata = fs.readFileSync(filename);  
    return JSON.parse(rawdata); 
}

function saveJsonFile(filename, json) {
    fs.writeFileSync(filename, JSON.stringify(json, null, 4));
}