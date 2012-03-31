
var socket = io.connect();

socket.on('message', function (data) {
    var msg = $('<div/>');

    // Display image based on type
    if (data['type']) {
        if (data['type'] == 'text') {
            msg.html(data['data']);
            msg.addClass('message-text');
            if (data['class']) {
                msg.addClass('message-' + data['class']);
            }
        }
        else if (data['type'] == 'image') {
            msg_img = $('<img/>');
            msg_img.attr('src', data['data']);
            // TODO more attr on image
            msg.append(msg_img);
            msg.addClass('message-image');
        }
    }

    msg.addClass('message');
    msg.hide();
    $('#dashboard').prepend(msg);
    msg.fadeIn(500);
    setTimeout(function () {
        msg.fadeOut(500, function () {
            msg.remove();
        });
    }, 30000);
});

