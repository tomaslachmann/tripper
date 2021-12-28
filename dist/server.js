"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const ChatController_1 = __importDefault(require("./controllers/ChatController"));
const Message_1 = require("./entity/Message");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(body_parser_1.default.json());
const httpServer = (0, http_1.createServer)(app);
const PORT = 4001;
const io = new socket_io_1.Server(httpServer, {
    path: '/Chat',
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.use((socket, next) => {
    socket.id = socket.handshake.auth.id;
    next();
});
app.use("/", routes_1.default);
app.use("/", routes_1.default);
app.get('/', function (Request, Response) {
    Response.send("Hola Tripper!");
});
let users = [];
const removeDuplicates = (arr) => {
    return arr.filter((arr, index, self) => index === self.findIndex((t) => (t.ID === arr.ID)));
};
io.on("connection", function (socket) {
    for (let [id, socket] of io.of("/").sockets) {
        users = users.filter((user) => user.UserID !== socket.handshake.auth.id);
        users.push({
            ID: id,
            UserID: socket.handshake.auth.id,
            name: socket.handshake.auth.name
        });
    }
    socket.emit("users", [...new Set(removeDuplicates(users))]);
    console.log("connect", removeDuplicates(users));
    socket.on('open-chat', async (data) => {
        let { from, to } = data;
        const toid = users.filter((user) => user.ID === to);
        const response = await ChatController_1.default.getAllMessages(from, toid[0].UserID);
        socket.emit('get-messages', { from: to, [to]: response });
    });
    socket.on('send-message', async ({ message, to }) => {
        const data = new Message_1.Message;
        let toid = users.filter((user) => user.ID === to);
        data.toid = toid[0].UserID;
        data.fromid = socket.handshake.auth.id;
        data.text = message;
        const response = await ChatController_1.default.saveMessage(data);
        socket.emit('message', { from: to, [to]: response });
        socket.to(to).emit('message', { from: socket.id, [socket.id]: response });
    });
    socket.on("disconnect", function (socket) {
        console.log("disconnect:", socket);
    });
});
httpServer.listen(PORT, () => {
    console.log("server běží");
});
//# sourceMappingURL=server.js.map