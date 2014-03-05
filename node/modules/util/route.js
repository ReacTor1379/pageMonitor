var imgHandler = require(__dirname + '/imgSave');

module.exports = function (app) {
    app.get('/util/saveimg', imgHandler.saveimg);
};
