'use strict';

define([
    'app',
    "common/comp/datatable"
], function (app) {
    var configureCtrl = function ($scope, $http) {
        $http.get('/configure/getAddress').
            success(function(json, status, headers, config) {
                if (json.code != 100000 || json.data.length <= 0) { 
                }
                $scope.addresses = json.data;
            });

        $scope.newAddress = function($event) {
            var inputNodes = $("input", $($event.currentTarget).parent().parent());
            var error = false;
            if (!$scope.newName) {
                inputNodes[0].focus();
                error = true;
            }
            if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test($scope.newAddr)) {
                inputNodes[1].focus();
                error = true;
            }
            if (error) {
                return;
            }
            
            $http.post('/configure/addAddress', {
                name: $scope.newName,
                addr: $scope.newAddr
            }).success(function(json, status, headers, config) {
                    if (json.code != 100000 || json.data.length <= 0) {
                        $location.url('/readPost');
                    }
                    console.log(json.data);
                    $scope.addresses.push({name : $scope.newName, email : $scope.newAddr});
                });
        };
        $scope.editAddress = function($event, index) {
            
            $scope.addresses[index].editFlag = !$scope.addresses[index].editFlag;
            $scope.addresses[index].oName = $scope.addresses[index].name;
            $scope.addresses[index].oEmail = $scope.addresses[index].email;
        };
        $scope.delAddress = function($event, index) {

        };
        $scope.save = function($event, index) {
            var trNode = $($event.currentTarget).parent().parent();
            $scope.addresses[index].editFlag = !$scope.addresses[index].editFlag;
        };
        $scope.cancel = function($event, index) {
            $scope.addresses[index].editFlag = !$scope.addresses[index].editFlag;
            $scope.addresses[index].name = $scope.addresses[index].oName;
            $scope.addresses[index].email = $scope.addresses[index].oEmail;
        };
        $scope.doError = function($event) {
            console.log(error);
        };
    };
    app.register.controller('configureCtrl', ['$scope', '$http', configureCtrl]);

});
