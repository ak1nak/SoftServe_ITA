"use strict";

class News{
    constructor() {
        this._users = [];
    }
    subscribe(cb) {
        this._users.push(cb);

    }
    subscribeAll(...rest) {
        this._users = this._users.concat(rest);
    }
    unsubscribe(cb) {
        this._users = this._users.filter(subscriber => subscriber !== cb);

        //*через splice*
        //this._cbIndex = this._users.indexOf(cb);
        //this._users.splice(this._cbIndex, 1);

    }
    sendNews(data) {
        this._users.forEach(subscriber => subscriber(data));
    }
    subsList() {
        console.log(this._users);
    }
}

class User{
    constructor(name, likesGenre) {
        this.name = name;
        this.likesGenre = likesGenre;
        this.readNews = this.readNews.bind(this);
    }
    readNews(data) {console.log (data, ` ${this.name} got it!`)}
}

const gameNews = new News();

const gamer1 = new User('Peter', 'action');
const gamer2 = new User('Vasya', 'RPG');
const gamer3 = new User('Lena', 'strategy');
const gamer4 = new User('Sam', 'sims');
const gamer5 = new User('Hanna', 'MMORPG');

gameNews.subscribe(gamer1.readNews);
gameNews.subscribe(gamer2.readNews);

gameNews.subscribeAll(gamer3.readNews, gamer4.readNews);

gameNews.sendNews('Half-life 3 is coming!');

gameNews.subsList();
gameNews.unsubscribe(gamer1.readNews);
gameNews.subsList();

gameNews.sendNews('Half-life 3 is not coming! LUL. ');
gameNews.subsList();

//gameNews.once(gamer5.readNews);
//gameNews.subsList();

