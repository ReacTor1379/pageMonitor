var page = require('webpage').create();
var system = require('system');

url = system.args[1];
page.viewportSize = { width: 800, height: 1000  };
page.open('http://172.16.86.173/game/harviewer/preview.php?inputUrl=' + url, function (status) {
    if (status !== 'success') {
        console.log('Unable to access the network!');
        phantom.exit();
    } else {
        setTimeout(function () {
            var body = document.body;
            body.style.backgroundColor = '#fff';
            page.render('/data1/wwwroot/js.wcdn.cn/t4/dest.png');
            phantom.exit();
        }, 1000);
    }
});