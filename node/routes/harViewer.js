var data = [{
        'name' : 'weibo首页',
        'value' : 'http://172.16.86.173/game/readhar.php'
    },
    {
        'name' : '测试地址',
        'value' : 'http://www.janodvarko.cz/har/viewer/examples/inline-scripts-block.harp'
    }
]

exports.gethar = function (req, res) {
    res.json({
        code : 100000,
        msg : '成功',
        data: 'testHar',
    });
};

exports.geturl = function (req, res) {
    res.json({
        code : 100000,
        msg : '成功',
        data: data
    });
};