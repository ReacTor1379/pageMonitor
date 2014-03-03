var test = require('./controller');

module.exports = function (app) {
    app.get('/test/getname', test.getname);
    app.post('/test/sendmail', test.sendmail);
};
