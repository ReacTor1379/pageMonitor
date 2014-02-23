'use strict';

define([
    'app',
    "lib/harViewer/harPreview",
    "common/comp/datatable"
], function (app, HarPreview) {
    var harViewerCtrl = function ($scope, $http, $location) {
        var content = document.getElementById("content");
        var harView = content.repObject = new HarPreview();
        var lock = false;
        var procURL = '';

        $http.get('/harViewer/geturl').
            success(function(json, status, headers, config) {
                if (json.code != 100000 || json.data.length <= 0) {
                    $location.url('/readPost');
                }
                $scope.urls = json.data;
            });
        
        $scope.sendMail = function() {
            $http.post('/test/sendmail', {
                addr: $scope.destAddr,
                sniffurl: $scope.harURL.value
            }).success(function(json, status, headers, config) {
                    if (json.code != 100000 || json.data.length <= 0) {
                        $location.url('/readPost');
                    }
                    console.log('success');
                });
        }

        $scope.update = function() {
            if (!$scope.harURL || lock) {
                console.log('lock');
                for (var i in $scope.urls) {
                    if ($scope.urls[i].value == procURL) {
                        $scope.harURL = $scope.urls[i];
                        return;
                    }
                }
                return;
            }
            lock = true;
            procURL = $scope.harURL.value;
            $('#waterfall')[0].innerHTML = '';

            var settings = {
                jsonp: true
            }
            harView.loadHar($scope.harURL.value, settings);
        }

        var fn = function() {
            harView.setRenderNode({
                stats: $("#stats")[0],
                waterfall: $("#waterfall")[0]
            })
        }
        harView.initialize(content, fn);

        $("#content").bind("onPreviewHARLoaded", function(event) {
            lock = false;
            procURL = '';
            $(".box").fadeIn();
        });
    };

    app.register.controller('harViewerCtrl', ['$scope', '$http', '$location', harViewerCtrl]);
});




