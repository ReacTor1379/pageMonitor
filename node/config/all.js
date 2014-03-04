'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    app: {
        title: 'page monitor',
        description: 'modified for weibo ria'
    },
    root: rootPath + '/app',
    port: process.env.PORT || 3000,
    templateEngine: 'html'
};