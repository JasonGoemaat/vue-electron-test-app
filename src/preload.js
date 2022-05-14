alert('preload.js!');
console.log('preload.js!');
var fs = require('fs');
console.log(fs);
fs.writeFileSync('c:\\t\\electron.txt', 'Hello, world!', { encoding: 'utf-8'});