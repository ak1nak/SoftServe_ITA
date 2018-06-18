"use strict";

module.exports = class News {
    constructor(newsId, newsName) {
        this.newsId = newsId;
        this.newsName = newsName;
        this.subscribers = [];
        this.articles = [];
    }
    subscribe(cb) {
        if(this.subscribers[cb]) {
            throw new Error('Already exists..');
        }
        this.subscribers.push(cb);
    }
    unsubscribe(cb) {
        if(this.subscribers.includes(cb)) {
            this.subscribers = this.subscribers.filter(subscriber => subscriber !== cb);
        } else {
            throw new Error('There is no such subscriber..');
        }
    }    
    createArticle(title) {
        let article = {title : `${title}`, message : `${Math.random()}`};
        this.articles.push(article);
        this.subscribers.forEach(subscriber => subscriber(article));
    }   
}
