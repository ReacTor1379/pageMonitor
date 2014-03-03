'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    app: {
        title: 'oage monitor',
        description: 'modified for weibo ria'
    },
    db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI,
    root: rootPath + '/app',
    port: process.env.PORT || 3000,
    templateEngine: 'html',
    sessionSecret: 'MEAN',
    sessionCollection: 'sessions'
};