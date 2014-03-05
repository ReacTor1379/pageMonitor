'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Addr = mongoose.model('address');
var Conf = mongoose.model('configure');
var Url = mongoose.model('monitorUrl');
var _ = require('lodash');

exports.getAddress = function(req, res) {
    Addr.find().exec(function(err, addresses) {
        if (err) {
            res.json({
                code : 100001,
                msg : '错误',
                data: ''
            });
        } else {
            res.json({
                code : 100000,
                msg : '成功',
                data: addresses
            });
        }
    });
};

exports.addAddress = function(req, res) {
    var reqData = {
        name : req.body.name,
        email : req.body.addr
    };

    Addr.create(reqData, function(error){
        if(error) {
            res.json({
                code : 100001,
                msg : error,
                data: ''
            });
        } else {
            res.json({
                code : 100000,
                msg : '成功',
                data: ''
            });
        }
    });
};

exports.editAddress = function(req, res) {
    var reqData = {
        name : req.body.name,
        email : req.body.addr
    };
    Addr.update({_id:req.body.id}, reqData, function(error){
        if(error) {
            res.json({
                code : 100001,
                msg : error,
                data: ''
            });
        } else {
            res.json({
                code : 100000,
                msg : '成功',
                data: ''
            });
        }
    });
};

exports.delAddress = function(req, res) {
    Addr.remove({_id:req.body.id}, function(error){
        if(error) {
            res.json({
                code : 100001,
                msg : error,
                data: ''
            });
        } else {
            res.json({
                code : 100000,
                msg : '成功',
                data: ''
            });
        }
    });
};

exports.setStat = function(req, res) {
    Conf.update({_id:req.body.id}, {settings:req.body.settings}, function(error){
        if(error) {
            res.json({
                code : 100001,
                msg : error,
                data: ''
            });
        } else {
            res.json({
                code : 100000,
                msg : '成功',
                data: ''
            });
        }
    });
};

exports.getStat = function(req, res) {
    Conf.find().exec(function(err, configures) {
        if (err) {
            res.json({
                code : 100001,
                msg : '错误',
                data: ''
            });
        } else {
            if (configures.length == 0) {
                var tmp = [
                    {"display": "白屏时间", checked: true, "name": "bp"},
                    {"display": "首屏时间", checked: true, "name": "sp"},
                    {"display": "JS加载时间", checked: true, "name": "js"},
                    {"display": "DOM完成时间", checked: true, "name": "dom"},
                    {"display": "全部完成时间", checked: true, "name": "all"}
                ];
                Conf.create({settings:JSON.stringify(tmp)}, function(error, configs){
                    if(error) {
                        res.json({
                            code : 100001,
                            msg : error,
                            data: ''
                        });
                    } else {
                        res.json({
                            code : 100000,
                            msg : 'ok',
                            data: configs[0]
                        });
                    }
                });
            } else {
                res.json({
                    code : 100000,
                    msg : '成功',
                    data: configures[0]
                });
            }
        }
    });
};

exports.getUrl = function(req, res) {
    Url.find().exec(function(err, urls) {
        if (err) {
            res.json({
                code : 100001,
                msg : '错误',
                data: ''
            });
        } else {
            res.json({
                code : 100000,
                msg : '成功',
                data: urls
            });
        }
    });
};

exports.addUrl = function(req, res) {
    var reqData = {
        name : req.body.name,
        addr : req.body.addr
    };

    Url.create(reqData, function(error){
        if(error) {
            res.json({
                code : 100001,
                msg : error,
                data: ''
            });
        } else {
            res.json({
                code : 100000,
                msg : '成功',
                data: ''
            });
        }
    });
};

exports.editUrl = function(req, res) {
    var reqData = {
        name : req.body.name,
        addr : req.body.addr
    };
    Url.update({_id:req.body.id}, reqData, function(error){
        if(error) {
            res.json({
                code : 100001,
                msg : error,
                data: ''
            });
        } else {
            res.json({
                code : 100000,
                msg : '成功',
                data: ''
            });
        }
    });
};

exports.delUrl = function(req, res) {
    Url.remove({_id:req.body.id}, function(error){
        if(error) {
            res.json({
                code : 100001,
                msg : error,
                data: ''
            });
        } else {
            res.json({
                code : 100000,
                msg : '成功',
                data: ''
            });
        }
    });
};