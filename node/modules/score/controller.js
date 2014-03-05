var config = {
    phantomjsPath: "/root/phantomjs-1.9.2-linux-x86_64/bin/phantomjs",
    yslowPath: '/root/phantomjs-1.9.2-linux-x86_64/bin/yslow.js',
    display: 'grade',   //basic/grade/stats/comps/all
    format: 'json'      //json/xml/plain/tap/junit
};

var url = require('url'); 
var querystring = require('querystring');

exports.getScore = function (req, res) {
    var arg = '', exec = '', cmd = '', child = '', result = '', tempUrl = '';

    arg = url.parse(req.url).query;
    tempUrl = querystring.parse(arg)["url"];
    tempUrl = tempUrl != null ? tempUrl : "http://www.baidu.com";

    exec = require('child_process').exec;
    cmd = config.phantomjsPath + " " + config.yslowPath + " --info " + config.display + " --format " + config.format + " ";

    child = exec(cmd + tempUrl, function(error, stdout, stderr){
        result = stdout;
        if(stdout == null || stdout == ''){
            res.write('');
            res.end();
        }else{
            res.write(stdout);
            res.end();
        }
    });
};