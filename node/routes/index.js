/*
 * GET home page.
 */
var path = require('path');
var config = require('../config');

exports.index = function(req, res){
    var html = path.normalize(config.documentRoot + '/views/index.html');
    res.sendfile(html);
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};
