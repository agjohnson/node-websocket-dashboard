
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

// Redis. Create subscriber and queue
var sub = redis.createClient();
var queue = redis.createClient();

sub.on('ready', function () {
    sub.subscribe('dashboard');
});

server.sub = sub;
server.queue = queue;

// Websockets 
var io = socket.listen(server.httpd);
io.sockets.on('connection', function (socket) {
    server.sub.on('message', function (channel, raw) {
        socket.reply = function (data) {
            server.queue.rpush('messages', JSON.stringify(data));
        };

        // TODO handle error
        var data = JSON.parse(raw);
        server.emit('receive', socket, data);
    });

   // Send connection notice
   socket.emit('message', {
        'type': 'text',
        'class': 'notice',
        'data': 'Connection established'
   });
});

server.io = io

// Process queue
server.on('dequeue', function () {
    server.queue.lpop('messages', function (err, raw) {
        if (raw) {
            var data = JSON.parse(raw);
            server.io.sockets.emit('message', data);
        }
    });
});

setInterval(function () {
    server.emit('dequeue');
}, 2000);

module.exports = server

