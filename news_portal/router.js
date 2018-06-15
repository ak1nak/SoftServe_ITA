"use strict";
const http = require('http');
const qs = require('querystring');
const news = require('./news.js');
const usersList = require('./users.js');

const server = http.createServer((req, res) => {

    let _req = req.url.split('/');

    switch (_req) {
        case _req[0] ==='news' && _req[2] === 'subscribe' :
            res.writeHead(200, { "Content-Type": "text/html" });
            news.subscribe(_req[1], _req[3]);
            break;

        case _req[0] ==='news' && _req[2] === 'unsubscribe' :
            res.writeHead(200, { "Content-Type": "text/html" });
            news.unsubscribe(_req[1], _req[3]);
            break;

        case _req[0] ==='user' && _req[2] === 'export' :
            res.writeHead(200, { "Content-Type": "application/json" });
            usersList._req[1].export();
            break;

        case _req[0] ==='user' && _req[2] === 'subscription' :
            res.writeHead(200, { "Content-Type": "text/html" });
            usersList._req[1].articles;
            break;

        case _req[0] ==='user' :
            res.writeHead(200, { "Content-Type": "text/html" });
            usersList._req[1];
            break;

        case _req[0] ==='news' :
            res.writeHead(200, { "Content-Type": "text/html" });
            news.showNewsById(_req[1]);
            break;

        default:
            res.writeHead(401, { "Content-Type": "text/html" });
            res.end('Bad Request')
            break;
    }   

}).listen(3000, () => {console.log("Server is working: ")});
 
