'use strict';

define(['app'], function (app) {
    var dashboardCtrl = function ($scope) {
        console.log('12312');
    };
    app.register.controller('dashboardCtrl', ['$scope', dashboardCtrl]);

});
