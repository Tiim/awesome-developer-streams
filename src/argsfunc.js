exports.links = (val, links) => {
    [text, url] = val.split(',');
    links.push({text, url});
    return links;
}

exports.collect = (val, arr) => {
    arr.push(val);
    return arr;
}