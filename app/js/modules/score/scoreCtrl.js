'use strict';

define([
    'app', 
    "common/comp/datatable", 
    'common/kit/util/easyTemplate',
    'common/comp/scoreConfig',
    'common/kit/util/loading'
], function (app, _datatable, _easyTemplate, _scoreConfig, _loading) {

    var scoreCtrl = function ($scope, $http) {
        /****************常量定义区****************/
        var TEMP = '' +
            '<#et temp data>' +
                '<#list data.list as score>' +
                    '<div class="row">' +
                        '<div class="span1"></div>' +
                        '<div class="span2">' +
                            '<div class="progress progress-${score.rank}">' +
                                '<div class="bar" style="width: ${score.score}%"></div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="span1" style="color:${score.color}">${score.score}</div>' +
                        '<div class="span3">${score.desc}' +
                            '<#if (score.detail)>'+
                                '<i class="icon-eye-open" data-toggle="tooltip" title="" data-original-title="${score.detail}" action-type="showDetail"></i>' +
                            '</#if>'+
                        '</div>' +
                    '</div>'+
                '</#list>' +
          '</#et>';
        var checkRule = _scoreConfig.getRule();
        var scoreData = {
            rank: '',
            color: '',
            score: '',
            desc: '',
            detail: ''
        };
        /******************************************/

        /***************公用方法******************/
        var pubFun = {
            getAndFormatData : function(data){
                var res = [], index = 0;
                for(var i = 0, len = checkRule.length; i < len; i++){
                    res[index] = {};

                    if(!data[checkRule[i]].score && checkRule[i] == 'yexternal'){
                        continue;
                    }

                    res[index].score = data[checkRule[i]].score;
                    res[index].score = res[index].score == null ? '' : res[index].score;
                    switch(pubFun.calcRank(res[index].score)){
                        case 1 : 
                            res[index].rank = 'success';
                            res[index].color = 'green';
                            break;
                        case 2 :
                            res[index].rank = 'warning';
                            res[index].color = 'green';
                            break;
                        case 3 :
                            res[index].rank = 'danger';
                            res[index].color = 'red';
                            break;
                        default:
                            res[index].rank = 'success';
                            res[index].color = 'green';
                    }
                    res[index].desc = data[checkRule[i]].score < 100 ? _scoreConfig.getDescribe(checkRule[i], 'error') : _scoreConfig.getDescribe(checkRule[i], 'succ');
                    res[index].detail = data[checkRule[i]].components != '' ? data[checkRule[i]].components : null;
                    res[index].detail = res[index].detail != null ? decodeURIComponent(res[index].detail) : null;
                    index++;
                }
                res = pubFun.sortArr(res);
                return res;
            },
            calcRank: function(score){
                if(score > 79){
                    return 1;
                }else if(score > 59 && score < 80){
                    return 2;
                }else{
                    return 3;
                }
            },
            sortArr: function(arr){
                arr = arr.sort(pubFun.compare);
                return arr;
            },
            compare: function(a, b){
                if(a.score < b.score){
                    return -1;
                }else if(a.score < b.score){
                    return 0;
                }else{
                    return 1;
                }
            },
            startCheckUrl: function(url){
                $http.get('/score/getScore?url=' + url).
                    success(function(json, status, headers, config) {
                        
                        if(typeof json == 'string' && json.indexOf('FAIL to load') > -1){
                            alert('无效的URL地址，请重试！');
                            _loading.hideLoading();
                            return;
                        }

                        var dataList = pubFun.getAndFormatData(json.g);
                        var tempHtml = _easyTemplate.easyTemplate(TEMP, {list: dataList}).toString();

                        $('#socreList').html(tempHtml);
                        $('#socreList').find("i[action-type='showDetail']").each(function(){
                            $(this).tooltip({placement: 'right'});
                        });
                        _loading.hideLoading();
                    });
            }
        };
        /*****************************************/

        /*****************页面初始化**************/
        $http.get('/harViewer/geturl').
            success(function(json, status, headers, config) {
                $scope.urls = json.data;
            });
        /*****************************************/

        /***************事件绑定*****************/
        $scope.changeUrl = function() {
            var url = $scope.scoreURL.value;
            if(url == ''){
                return;
            }

            $('#socreList').html("");
            _loading.showLoading();

            pubFun.startCheckUrl(url);
        };

        $scope.startCheck = function() {
            var val = $('#urlToCheck').val();

            if(val == null && val == ''){
                alert('请输入URL');
            }

            var strRegex = "^((https|http|ftp|rtsp|mms)://)" +
                "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@  
                "(([0-9]{1,3}\.){3}[0-9]{1,3}" + // IP形式的URL- 199.194.52.184  
                "|" + // 允许IP和DOMAIN（域名） 
                "([0-9a-z_!~*'()-]+\.)*" + // 域名- www.
                "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." + // 二级域名 
                "[a-z]{2,6})" + // first level domain- .com or .museum
                "(:[0-9]{1,4})?"; // 端口- :80

            var re = new RegExp(strRegex);
            if(re.test(val)){
                $('#socreList').html("");
                _loading.showLoading();
                pubFun.startCheckUrl(val);
            }else{
                alert('请输入正确的URL');
            }
        };
        /*****************************************/
    };
    app.register.controller('scoreCtrl', ['$scope', '$http', scoreCtrl]);
});
