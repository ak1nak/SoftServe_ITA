"use strict";

const usersList = require('./users.js');

module.exports = class News {
    constructor() {
        this._subscribers = {};
        this._news = [];
    }
    subscribe(news_id, id) {
        if(!this._subscribers[id]) {
            this._subscribers[id] = [];
        }
        this._subscribers[id].push(usersList.id);
    }
    unsubscribe(news_id, id) {
        const gen = this._subscribers[id];
        if(gen) {
            this._subscribers[id] = gen.filter(subscriber => subscriber !== id);
        } else {
            console.log(`There is no ${id}`);
        }
        
        if(this._subscribers[id].length === 0) {
            delete this._subscribers[id];
        }
    }
    showNewsById(news_id) {
        return this._news[news_id];
    }
    generateNews(news_id, data) {
        this._news[news_id] = data;
    }
    /*sendNews(id, data) {
        const gen = this._subscribers[id];
        if(gen) {
            gen.forEach(subscriber => subscriber.call(null, data));
        } else {
            console.log(`There is no ${id}`);
        }
    }*/
    
   
}