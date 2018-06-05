"use strict";

class News {
    constructor() {
        this._users = {};
    }
    subscribe(genre, cb) {
        if(!this._users[genre]) {
            this._users[genre] = [];
        }
        this._users[genre].push(cb);
    }

    unsubscribe(genre, cb) {
        const gen = this._users[genre];
        if(gen) {
            this._users[genre] = gen.filter(subscriber => subscriber !== cb);
        } else {
            console.log(`There is no ${genre}`);
        }
        /*
        if(gen.length === 0) {
            Object.defineProperty(this._users, gen, {configurable : true});
            delete gen;
         }
        */
        // гадский use strict не любит delete :(
        //  стоит ли делать gen = undefined;  ?
    }

    sendNews(genre, data) {
        const gen = this._users[genre];
        if(gen) {
            gen.forEach(subscriber => subscriber.call(null, data));
        } else {
            console.log(`There is no ${genre}`);
        }
    }
    subsList() {
        for(let user in this._users) {
             console.log(`${user} : ${this._users[user]}`);
        }
        console.log(`------------------------------------------`);
    }
}

class User {
    constructor(name, likesGenre) {
        this.name = name;
        this.likesGenre = likesGenre;
        this.readNews = this.readNews.bind(this);
    }
    readNews(data) {console.log (data, ` ${this.name} got it!
    `)}
}

const gameNews = new News();

const gamer1 = new User('Peter', 'action');
const gamer2 = new User('Vasya', 'RPG');
const gamer3 = new User('Lena', 'strategy');
const gamer4 = new User('Sam', 'sims');
const gamer5 = new User('Hanna', 'MMORPG');

gameNews.subscribe(gamer1.likesGenre, gamer1.readNews);
gameNews.subscribe(gamer2.likesGenre, gamer2.readNews);
gameNews.subscribe(gamer3.likesGenre, gamer3.readNews);

gameNews.sendNews('action', 'Half-life 3 is coming!');
gameNews.sendNews('RPG', 'Diablo 4 is coming out');
gameNews.sendNews('strategy', 'C&C reborn!');
gameNews.subsList();

gameNews.unsubscribe(gamer1.likesGenre, gamer1.readNews);
gameNews.subsList();

gameNews.sendNews('action', 'Half-life 3 JUST A JOKE!!');
gameNews.subsList();



