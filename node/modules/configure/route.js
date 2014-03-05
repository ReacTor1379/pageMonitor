var configure = require('./controller');

module.exports = function (app) {
    app.get('/configure/getAddress', configure.getAddress);
    app.post('/configure/delAddress', configure.delAddress);
    app.post('/configure/editAddress', configure.editAddress);
    app.post('/configure/addAddress', configure.addAddress);
    app.post('/configure/setStat', configure.setStat);
    app.get('/configure/getStat', configure.getStat);
    app.get('/configure/getUrl', configure.getUrl);
    app.post('/configure/delUrl', configure.delUrl);
    app.post('/configure/editUrl', configure.editUrl);
    app.post('/configure/addUrl', configure.addUrl);
};
