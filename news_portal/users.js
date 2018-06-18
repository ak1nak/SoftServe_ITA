"use strict";

module.exports = class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.readNews = this.readNews.bind(this);
        this.articles = [];
        this.subscription = [];
    }
    readNews(data) {
        this.articles.push(data);
        console.log(data, ` ${this.name} got it!`);
        
    }
}