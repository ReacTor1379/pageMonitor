/**
 * Created with JetBrains WebStorm.
 * User: c-sailor.zhang
 * Date: 1/23/13
 * Time: 1:47 PM
 * To change this template use File | Settings | File Templates.
 */

var index = require('./routes/index');
var test = require('./routes/test');
var harViewer = require('./routes/harViewer');
var configure = require('./routes/configure');
module.exports = function (app) {
    app.get('/', index.index);
    app.get('/test/getname', test.getname);
    app.post('/test/sendmail', test.sendmail);
    app.get('/harViewer/geturl', harViewer.geturl);
    app.get('/configure/getAddress', configure.getAddress);
    app.post('/configure/delAddress', configure.delAddress);
    app.post('/configure/editAddress', configure.editAddress);
    app.post('/configure/addAddress', configure.addAddress);
};
