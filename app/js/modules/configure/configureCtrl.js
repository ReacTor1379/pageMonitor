'use strict';

define([
    'app',
    "common/comp/datatable"
], function (app) {
    var configureCtrl = function ($scope, $http) {
        $("input:checkbox, input:radio, input:file").not('[data-no-uniform="true"],#uniform-is-ajax').uniform();
        $http.get('/configure/getAddress').
            success(function(json, status, headers, config) {
                if (json.code != 100000 || json.data.length <= 0) { 
                }
                $scope.addresses = json.data;
            });
        $http.get('/configure/getStat').
            success(function(json, status, headers, config) {
                if (json.code != 100000 || json.data.length <= 0) { 
                    return;
                }

                $scope.configs = JSON.parse(json.data.settings);
                $scope.confid = json.data._id;
            });

        $scope.newAddress = function($event) {
            var inputNodes = $("input", $($event.currentTarget).parent().parent());
            var error = false;
            if (!$scope.newName) {
                inputNodes[0].focus();
                $(inputNodes[0]).parent().parent().addClass('control-group error');
                error = true;
            }
            if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test($scope.newAddr)) {
                inputNodes[1].focus();
                $(inputNodes[1]).parent().parent().addClass('control-group error');
                error = true;
            }
            if (error) {
                return;
            }
            
            $http.post('/configure/addAddress', {
                name: $scope.newName,
                addr: $scope.newAddr
            }).success(function(json, status, headers, config) {
                    if (json.code != 100000) {
                        alert('new addr error');
                    } else {
                        $scope.addresses.push({name : $scope.newName, email : $scope.newAddr});
                    }
                });
        };
        $scope.editAddress = function($event, index) {
            $scope.addresses[index].editFlag = !$scope.addresses[index].editFlag;
            $scope.addresses[index].oName = $scope.addresses[index].name;
            $scope.addresses[index].oEmail = $scope.addresses[index].email;

        };
        $scope.delAddress = function($event, index) {
            $http.post('/configure/delAddress', {
                id: $scope.addresses[index]._id
            }).success(function(json, status, headers, config) {
                    if (json.code != 100000) {
                        alert('new addr error');
                    } else {
                        $scope.addresses.splice(index, 1);
                    }
                });
        };
        $scope.save = function($event, index) {
            var trNode = $($event.currentTarget).parent().parent();
            $scope.addresses[index].editFlag = !$scope.addresses[index].editFlag;

            $http.post('/configure/editAddress', {
                id: $scope.addresses[index]._id,
                name: $scope.addresses[index].name,
                addr: $scope.addresses[index].email
            }).success(function(json, status, headers, config) {
                    if (json.code != 100000) {
                        alert('new addr error');
                    } else {
                        $scope.addresses[index].editFlag = !$scope.addresses[index].editFlag;
                        $scope.addresses[index].oName = '';
                        $scope.addresses[index].oEmail = '';
                    }
                });
        };
        $scope.cancel = function($event, index) {
            $scope.addresses[index].editFlag = !$scope.addresses[index].editFlag;
            $scope.addresses[index].name = $scope.addresses[index].oName;
            $scope.addresses[index].email = $scope.addresses[index].oEmail;
        };
        $scope.doError = function($event) {
            console.log(error);
        };
        $scope.changeConfig = function() {
            var confStr = JSON.stringify($scope.configs);
            $http.post('/configure/setStat', {id:$scope.confid, settings:confStr}
                ).success(function(json, status, headers, config) {
                    if (json.code != 100000) {
                        alert('new addr error');
                    }
                });
        }
    };
    app.register.controller('configureCtrl', ['$scope', '$http', configureCtrl]);

});
