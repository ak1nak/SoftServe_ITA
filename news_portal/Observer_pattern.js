"use strict";

class News {
    constructor () {
        this.users = []
    }

    subscribe (fn) {
        this.users.push(fn)
    }

    unsubscribe (fn) {
        this.users = this.users.filter(subscriber => subscriber !== fn)
    }

    sendNews (data) {
        this.users.forEach(subscriber => subscriber(data))
    }
}

class User {
    constructor (name, likesGenre) {
        this.name = name;
        this.likesGenre = likesGenre;
        this.readNews = (data) => {console.log (data, `${this.name} got it!`);}
    }

}

const gameNews = new News();

const gamer1 = new User('Peter', 'action');
const gamer2 = new User('Vasya', 'RPG');
const gamer3 = new User('Lena', 'strategy');

gameNews.subscribe(gamer1.readNews);
gameNews.subscribe(gamer2.readNews);
gameNews.subscribe(gamer3.readNews);


gameNews.sendNews('Half-life 3 is coming!');

gameNews.unsubscribe(gamer1.readNews);

gameNews.sendNews('Half-life 3 is not coming! LUL');