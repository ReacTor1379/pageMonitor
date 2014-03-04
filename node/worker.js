process.on('uncaughtException', function(err) {
    console.error('Caught exception: ', err);
});

/**
 * First we set the node enviornment variable if not set before
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config');
var mongoose = require('mongoose');

module.exports = function() {
    /**
     * Main application entry file.
     * Please note that the order of loading is important.
     */
    // Bootstrap db connection
    var db = mongoose.connect(config.db);
    
    // Init the express application
    var app = require('./express/server')(db);

    // Start the app by listening on <port>
    app.listen(app.get('port'));

    console.log('saiyan worker server ' + process.pid + ' running on ' + app.get('port') + ' port...');
};