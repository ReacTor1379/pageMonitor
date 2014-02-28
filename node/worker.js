(function(module) {
    var express = require('express');
    var routes = require('./routes');
    var http = require('http');
    var path = require('path');
    var fs = require('fs');
    var config = require('./config');

    process.on('uncaughtException', function(err) {
        console.error('Caught exception: ', err);
    });

    path.existsSync = fs.existsSync ? function(uri) {
        return fs.existsSync.call(fs, uri)
    } : path.existsSync;

    if (!path.existsSync(config.documentRoot)) {
        console.error('###########################################################');
        console.error(' >>> Fatal Error: ' + config.documentRoot + ' does not exist.\n You must set correct "documentRoot" in config.js and restart!');
        console.error('###########################################################');
        process.exit(1);
    }

    module.exports = function() {
        var app = express();

        app.configure(function() {
            app.set('port', config.PORT || 3000);
            app.set('views', __dirname + '/../app/views');
            app.set('view engine', 'html');
            app.use(express.favicon());
            app.use(express.logger('dev'));
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use(express.cookieParser('your secret here'));
            app.use(express.session());
            app.use(app.router);

            if (config.documentRoot) { //下面的2句必须在自定义路由规则之后
                app.use(express.static(config.documentRoot));
                app.use(express.directory(config.documentRoot));
            }
        });

        app.configure('development', function () {
            app.use(express.errorHandler());
        });

        routes(app);

        app.listen(app.get('port'));
        console.log('saiyan worker server ' + process.pid + ' running on ' + app.get('port') + ' port...');
    }
})(module);