var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    host: "mail.staff.sina.com.cn", // hostname
    secureConnection: false, // 
    port: 587, // 
    auth: {
        user: "sina.mps@staff.sina.com.cn",
        pass: "b3Mx94Y4s4W7"
    }
});

exports.sendmail = function(req, res) {
    var exec = require("child_process").exec;
    exec ('/root/phantomjs-1.9.2-linux-x86_64/bin/phantomjs technews.js http://172.16.86.173/game/readhar.php', function(error, stdout, stderr) {
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: "报警机器人 <sina.mps@staff.sina.com.cn>", // sender address
            to: req.body.addr, // list of receivers
            subject: "测试邮件", // Subject line
            text: "这是一封来自性能监控系统的测试邮件", // plaintext body
            html: "<b>这是一封来自性能监控系统的测试邮件</b><br><img src='http://10.13.49.237/t4/dest.png'></img>" // html body
        }

        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
                res.json({
                    code : 100000,
                    msg : '成功',
                    data: 'saiyan'
                });
            }

            // if you don't want to use this transport object anymore, uncomment following line
            smtpTransport.close(); // shut down the connection pool, no more messages
        });
    })
};

exports.getname = function (req, res) {
    var name = req.query.name;
    if (name === 'test') {
        res.json({
            code : 100000,
            msg : '成功',
            data: 'saiyan'
        });
    }
    else {
        res.json(false);
    }
};