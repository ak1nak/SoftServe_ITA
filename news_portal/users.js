"use strict";
class User {
    constructor(id, name, likesGenre) {
        this.id = id;
        this.name = name;
        this.likesGenre = likesGenre;
        this.readNews = this.readNews.bind(this);
        this.articles = [];
    }
    readNews(data) {console.log (data, ` ${this.name} got it!
    `)}
    export() {
        return this;
    }
}

exports.usersList = {};

exports.usersList.id1 = new User('id1', 'Lisa', 'action');
exports.usersList.id2= new User('id2', 'Peter', 'RPG');
exports.usersList.id3 = new User('id3', 'Sam', 'FPS');

console.dir(exports.usersList);



