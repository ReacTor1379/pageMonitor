var harViewer = require(__dirname + '/controller');

module.exports = function (app) {
    app.get('/harViewer/geturl', harViewer.geturl);
};
