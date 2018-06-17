"use strict";

const http = require('http');
const fs = require('fs');
const path = require('path');
const parse = require('querystring');
const News = require('./news.js');
const User = require('./users.js');

let usersList = {};
let id1 = new User('id1', 'Lisa'); 
let id2 = new User('id2', 'Peter'); 
let id3 = new User('id3', 'Sam');

usersList[id1] = id1;
usersList[id2] = id2;
usersList[id3] = id3;

let newsList = {};
let news1 = new News('news1', 'Kharkov News');
let news2 = new News('news2', 'Kiev News');
let news3 = new News('news3', 'Lviv News');

newsList[news1] = news1;
newsList[news2] = news2;
newsList[news2] = news3;

let time = new Date();
time = `${time.getHours()}_${time.getMinutes()}_${time.getSeconds()}`;


function showNewsById(newsId) {
    return newsList[newsId];
}
function jsonThis(data) {
    let _data = JSON.stringify(data);
    return _data;
}
function generateNews(newsId) {
    newsId.createArticle(time);    
}

setTimeout(generateNews, 7000, newsList[news1]);



/* setInterval(generateNews, 5000, newsList[news1]);
setInterval(generateNews, 5000, newsList[news2]);
setInterval(generateNews, 5000, newsList[news3]); */

const server = http.createServer((req, res) => {

    let _req = req.url.split('/');
    
    if (_req[1] ==='news' && _req[3] === 'subscribe') {        
            res.writeHead(200, { "Content-Type": "text/html" });
            newsList[_req[2]].subscribe(usersList[_req[4]].readNews);
            res.end(`${usersList[_req[4]].name} subscribed!`);

    } else if (_req[1] ==='news' && _req[3] === 'unsubscribe') {
            res.writeHead(200, { "Content-Type": "text/html" });
            newsList[_req[2]].unsubscribe(usersList[_req[4]].readNews);
            res.end(`${usersList[_req[4]].name} unsubscribed!`);

    } else if (_req[1] ==='user' && _req[3] === 'export') {
            //res.writeHead(200, { "Content-Type": "application/json" });
            let jsonedFileName = `user_${_req[2]}_${time}.json`;
            fs.writeFile(`${jsonedFileName}`, jsonThis(usersList[_req[2]]), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
            
            /* res.writeHead(301, {Location: 'http://localhost:3000/'+jsonedFileName}
              ); */
            res.end();
    } else if (_req[1] ==='user' && _req[3] === 'subscription') {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(jsonThis(usersList[_req[2]].articles));
            res.end();

    } else if(_req[1] ==='user') {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(jsonThis(usersList[_req[2]]));
            res.end();

    } else if (_req[1] ==='news') {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(showNewsById(_req[2]));
            res.end();

    } else if (_req[1] ==='favicon.ico' || req.url.endsWith('.json')) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end();

    } else {
            res.writeHead(401, { "Content-Type": "text/html" });
            res.end('Bad Request');
    }   
    
}).listen(3000, () => {console.log("Server is working: ")});
 
