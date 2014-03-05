var score = require(__dirname + '/controller');

module.exports = function (app) {
    app.get('/score/getScore', score.getScore);
};