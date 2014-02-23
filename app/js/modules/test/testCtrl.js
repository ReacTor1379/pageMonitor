'use strict';

define(['app'], function (app) {
    var testCtrl = function ($scope, $http) {
        $scope.sayHello = function()
        {
            $http.get('/test/getname' , {
                params : {
                    name : $scope.name
                }
            }).success(function(json, status, headers, config) {
                    $scope.greeting = json.data;
                });
        }
    };
    app.register.controller('testCtrl', ['$scope', '$http', testCtrl]);

});
