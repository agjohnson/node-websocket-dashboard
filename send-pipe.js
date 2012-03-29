// Read stdin and pipe commands to redis

var redis = require('redis');
var client = redis.createClient();

process.stdin.resume()

process.stdin.on('data', function (data) {
    client.publish('text', data.toString());
});

process.stdin.on('end', function () {
    client.on('drain', function () {
        client.end();
    });
});

