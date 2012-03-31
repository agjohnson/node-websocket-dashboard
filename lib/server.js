
var socket = require('socket.io');
var connect = require('connect');
var redis = require('redis');

var EventEmitter = require('events').EventEmitter;
var server = new EventEmitter();

// httpd
var httpd = connect();
httpd.use(connect.static(__dirname + '/../public'));
httpd.listen(32001);
server.httpd = httpd;

// Redis
var redis = redis.createClient();
redis.on('ready', function () {
    redis.subscribe('text', 'image');
});
server.redis = redis;

// Websockets 
var io = socket.listen(server.httpd);
io.sockets.on('connection', function (socket) {
    server.redis.on('message', function (channel, message) {
        socket.reply = function (data) {
            // TODO other data types
            socket.emit('message ' + channel, { "message" : data });
        };
        module.exports.emit('receive', socket, message);
    });
});

module.exports = server

