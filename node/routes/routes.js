/**
 * Created with JetBrains WebStorm.
 * User: c-sailor.zhang
 * Date: 1/23/13
 * Time: 1:47 PM
 * To change this template use File | Settings | File Templates.
 */

var index = require('./index');
var test = require('./test');
var harViewer = require('./harViewer');
module.exports = function (app) {
    app.get('/', index.index);
    app.get('/test/getname', test.getname);
    app.post('/test/sendmail', test.sendmail);
    app.get('/harViewer/geturl', harViewer.geturl);
};
