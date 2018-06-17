"use strict";

module.exports = class News {
    constructor(newsId, newsName) {
        this._newsId = newsId;
        this._newsName = newsName;
        this._subscribers = [];
        this._articles = [];
    }
    subscribe(cb) {
        if(this._subscribers[cb]) {
            throw new Error('Already exists..');
        }
        this._subscribers.push(cb);
    }
    unsubscribe(cb) {
        if(this._subscribers.includes(cb)) {
            this._subscribers = this._subscribers.filter(subscriber => subscriber !== cb);
        } else {
            throw new Error('There is no such subscriber..');
        }
    }    
    createArticle(title) {
        let article = {title : `${title}`, message : `${Math.random()}`};
        this._articles.push(article);
        this._subscribers.forEach(subscriber => subscriber(article));
    }   
}
