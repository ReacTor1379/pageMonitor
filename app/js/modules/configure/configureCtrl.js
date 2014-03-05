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
        $http.get('/configure/getUrl').
            success(function(json, status, headers, config) {
                if (json.code != 100000 || json.data.length <= 0) { 
                }
                $scope.urls = json.data;
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
            if (!$scope.newName) {
                inputNodes[0].focus();
                $(inputNodes[0]).parent().parent().addClass('control-group error');
                return;
            }
            if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test($scope.newAddr)) {
                inputNodes[1].focus();
                $(inputNodes[1]).parent().parent().addClass('control-group error');
                return;
            }
            
            $(inputNodes[0]).parent().parent().removeClass('control-group error');
            $(inputNodes[1]).parent().parent().removeClass('control-group error');
            
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
        $scope.newUrl = function($event) {
            var inputNodes = $("input", $($event.currentTarget).parent().parent());
            if (!$scope.newUrlName) {
                inputNodes[0].focus();
                $(inputNodes[0]).parent().parent().addClass('control-group error');
                return;
            }
            if (!$scope.newUrlAddr) {
                inputNodes[1].focus();
                $(inputNodes[1]).parent().parent().addClass('control-group error');
                return;
            }
            //先把url中的大写字母转换成小写
            var val = $scope.newUrlAddr.toLowerCase();
            var strRegex = "^((https|http|ftp|rtsp|mms)://)" +
                "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@  
                "(([0-9]{1,3}\.){3}[0-9]{1,3}" + // IP形式的URL- 199.194.52.184  
                "|" + // 允许IP和DOMAIN（域名） 
                "([0-9a-z_!~*'()-]+\.)*" + // 域名- www.
                "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." + // 二级域名 
                "[a-z]{2,6})" + // first level domain- .com or .museum
                "(:[0-9]{1,4})?"; // 端口- :80
            var re = new RegExp(strRegex);
            if (!re.test(val) || !/\./g.test(val)) {
                inputNodes[1].focus();
                $(inputNodes[1]).parent().parent().addClass('control-group error');
                return;
            }
            
            $(inputNodes[0]).parent().parent().removeClass('control-group error');
            $(inputNodes[1]).parent().parent().removeClass('control-group error');

            $http.post('/configure/addUrl', {
                name: $scope.newUrlName,
                addr: $scope.newUrlAddr
            }).success(function(json, status, headers, config) {
                    if (json.code != 100000) {
                        alert('new addr error');
                    } else {
                        $scope.urls.push({name : $scope.newUrlName, addr : $scope.newUrlAddr});
                    }
                });
        };
        $scope.editUrl = function($event, index) {
            $scope.urls[index].editFlag = !$scope.urls[index].editFlag;
            $scope.urls[index].oName = $scope.urls[index].name;
            $scope.urls[index].oEmail = $scope.urls[index].email;

        };
        $scope.delUrl = function($event, index) {
            $http.post('/configure/delUrl', {
                id: $scope.urls[index]._id
            }).success(function(json, status, headers, config) {
                    if (json.code != 100000) {
                        alert('new addr error');
                    } else {
                        $scope.urls.splice(index, 1);
                    }
                });
        };
        $scope.saveUrl = function($event, index) {
            var trNode = $($event.currentTarget).parent().parent();
            $scope.urls[index].editFlag = !$scope.urls[index].editFlag;

            $http.post('/configure/editUrl', {
                id: $scope.urls[index]._id,
                name: $scope.urls[index].name,
                addr: $scope.urls[index].addr
            }).success(function(json, status, headers, config) {
                    if (json.code != 100000) {
                        alert('new addr error');
                    } else {
                        $scope.urls[index].editFlag = !$scope.urls[index].editFlag;
                        $scope.urls[index].oName = '';
                        $scope.urls[index].oEmail = '';
                    }
                });
        };
        $scope.cancelUrl = function($event, index) {
            $scope.urls[index].editFlag = !$scope.urls[index].editFlag;
            $scope.urls[index].name = $scope.urls[index].oName;
            $scope.urls[index].email = $scope.urls[index].oEmail;
        };
    };
    app.register.controller('configureCtrl', ['$scope', '$http', configureCtrl]);

});
