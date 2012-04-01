// Read stdin and pipe commands to redis

var redis = require('redis');
var client = redis.createClient();

process.stdin.resume()

process.stdin.on('data', function (buffer) {
    var data = buffer.toString();
    var raw = JSON.stringify({
        'data': data,
        'type': 'text'
    });
    client.publish('dashboard', raw);
});

process.stdin.on('end', function () {
    client.on('drain', function () {
        client.end();
    });
});

