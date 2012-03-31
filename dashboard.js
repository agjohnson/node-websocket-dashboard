
var server = require('./lib/server.js');

server.on('receive', function(socket, msg) {
    var arr = /foo/.exec(msg);
    if (arr) {
        socket.reply("bar");
    }
});

