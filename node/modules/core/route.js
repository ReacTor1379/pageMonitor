//var core = require('./modules/core/controller');
var core = require('./controller');
module.exports = function (app) {
    app.get('/', core.index);
};
