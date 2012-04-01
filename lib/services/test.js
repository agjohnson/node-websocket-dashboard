
var Handler = require('../reply.js').Handler;
var handle = new Handler();

handle.use(function(socket, msg) {
    if (/foo/.exec(msg.data)) {
        socket.reply({
            'type': 'text',
            'data': 'bar'
        });
    }
});

module.exports = handle;

