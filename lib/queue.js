
var redis = require('redis');
var client = redis.createClient();

client.on('ready', function () {
    client.subscribe('text', 'image');
});

exports.client = client;

