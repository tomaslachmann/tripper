"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class ChatController {
}
_a = ChatController;
ChatController.get = async (req, res) => {
    var io = req.app.get('socketio');
    console.log(req.app);
    io.emit("hola");
    res.send("hola");
};
ChatController.send = async (req, res) => {
    var io = req.app.get('socketio');
    io.on('send-message', function (msg) {
        console.log(msg);
        res.send(msg);
    });
};
exports.default = ChatController;
//# sourceMappingURL=SocketController.js.map