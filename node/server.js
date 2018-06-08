const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, resp) => {
    fs.readFile('./index.html', 'utf8', (err, data) => {console.log(data)});
    resp.end('done');
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});