
var socket = io.connect();

socket.on('message text', function (data) {
    var msg = $('<div/>');
    msg.html(data['message']);
    msg.addClass('message');
    msg.addClass('message-text');
    $('#dashboard').prepend(msg);
});

socket.on('message image', function (data) {
    var msg = $('<img/>');
    msg.html(data['message']);
    msg.addClass('message');
    msg.addClass('message-image');
    $('#dashboard').prepend(msg);
});

