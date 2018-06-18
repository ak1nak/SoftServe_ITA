"use strict";

const http = require('http');
const fs = require('fs');
const News = require('./news.js');
const User = require('./users.js');

/* хардкодим юзеров и новости */
let usersList = {};
let id1 = new User('id1', 'Lisa'); 
let id2 = new User('id2', 'Peter'); 
let id3 = new User('id3', 'Sam');

usersList.id1 = id1;
usersList.id2 = id2;
usersList.id3 = id3;

let newsList = {};
let news1 = new News('news1', 'Kharkov News');
let news2 = new News('news2', 'Kiev News');
let news3 = new News('news3', 'Lviv News');

newsList.news1 = news1;
newsList.news2 = news2;
newsList.news3 = news3;

/* вспомогательные функции */
function jsonThis(data) {
    let _data = JSON.stringify(data);
    return _data;
}
const generateNews = function (newsId) {
    let time = new Date();
    time = `${time.getHours()}_${time.getMinutes()}_${time.getSeconds()}`;
    newsId.createArticle(time);
}
/* начинаем спамить новости */
setInterval(generateNews, 5000, newsList.news1);
setInterval(generateNews, 5000, newsList.news2);
setInterval(generateNews, 5000, newsList.news3);

const server = http.createServer((req, res) => {

    let _req = req.url.split('/'); 
    let nl2 = newsList[_req[2]]; let ul2 = usersList[_req[2]]; let ul4 = usersList[_req[4]];
    console.log(_req.length);

    if (_req[1] ==='news' && _req[3] === 'subscribe') {        
            res.writeHead(200, { "Content-Type": "text/plain" });
            nl2.subscribe(ul4.readNews);
            ul4.subscription.push(nl2.newsName);
            res.end(`${ul4.name} subscribed on ${nl2.newsName}!`);

    } else if (_req[1] ==='news' && _req[3] === 'unsubscribe') {
            res.writeHead(200, { "Content-Type": "text/plain" });
            nl2.unsubscribe(ul4.readNews);
            ul4.subscription = ul4.subscription.filter(sub => sub !== nl2.newsName);
            res.end(`${ul4.name} unsubscribed ${nl2.newsName}!`);

    } else if (_req[1] ==='user' && _req[3] === 'export') {
            let time = new Date();
            time = `${time.getHours()}_${time.getMinutes()}_${time.getSeconds()}`;
            let jsonedFileName = `user_${_req[2]}_${time}.json`;
            fs.writeFile(`${jsonedFileName}`, jsonThis(ul2), (err) => {
                if (err) throw err;                
            });
            res.writeHead(200, { "Content-Disposition": `attachment; filename=${jsonedFileName}`});
            res.end();

    } else if (_req[1] ==='user' && _req[3] === 'subscription') {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(jsonThis(ul2.subscription));
            res.end();

    } else if(_req[1] ==='user') {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(jsonThis(ul2));
            res.end();

    } else if (_req[1] ==='news') {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(jsonThis(nl2));
            res.end();

    } else if (_req[1] ==='favicon.ico'|| _req[1] === ' ') {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end();

    } else {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end('Bad Request');
    }   
    
}).listen(3000, () => {console.log("Server is working on port 3000 : ")});
 
