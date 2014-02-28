var demo = [
    {"name": "高鑫", "email": "gaoxin3@staff.sina.com.cn"},
    {"name": "吴迪", "email": "wudi3@staff.sina.com.cn"}
];

exports.getAddress = function(req, res) {
    

    res.json({
        code : 100000,
        msg : '成功',
        data: demo
    });
};

exports.addAddress = function(req, res) {
    var reqData = {
        name : req.body.name,
        email : req.body.addr,
    }
    demo.push(reqData);

    res.json({
        code : 100000,
        msg : '成功',
        data: demo
    });
};

exports.editAddress = function(req, res) {
    for (var i in demo) {
        if (demo[i].name == req.body.name) {
            demo[i].email = req.body.addr;
        }
    }

    res.json({
        code : 100000,
        msg : '成功',
        data: demo
    });
};

exports.delAddress = function(req, res) {
    for (var i in demo) {
        if (demo[i].name == req.body.name && demo[i].email == req.body.addr) {
            demo.splice(i, 1);
        }
    }

    res.json({
        code : 100000,
        msg : '成功',
        data: demo
    });
};