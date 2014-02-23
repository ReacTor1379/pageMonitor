(function(module) {
    //所有服务器的配置参数
    module.exports = {
        'documentRoot'    : "/data1/wwwroot/saiyan/app/",
        //默认启动3个worker子进程作为服务器
        'workerNum'     : 1,
        //端口
        'PORT' : 3000,
    };
})(module);

