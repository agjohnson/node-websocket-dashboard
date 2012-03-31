
var Handler = function () {};

Handler.prototype.attach = function (server) {
    server.on('receive', this.process);
};

Handler.prototype.use = function (func) {
    Handler.prototype.process = func
};

exports.Handler = Handler;

