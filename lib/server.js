
var socket = require('socket.io');
var express = require('express');
var httpd = express.createServer();

var redis = require('./queue.js').client;

// Set up web server
httpd.configure(function () {
    httpd.use(express.static(__dirname + '/../public'));
});
httpd.set('view options', {
    layout: false
});

httpd.listen(32001);

httpd.get('/', function (request, response) {
    response.render('index.jade');
});

// Set up web sockets
var io = socket.listen(httpd);
io.sockets.on('connection', function (socket) {
    redis.on('message', function (channel, message) {
        socket.emit('message ' + channel, { 
            "message": message
        });
    });
});

