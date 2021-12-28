"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = __importDefault(require("../queries/Chat"));
class ChatController {
}
_a = ChatController;
ChatController.getAllMessages = async (fromid, toid) => {
    const ChatRepository = Chat_1.default;
    let messages;
    try {
        const response = await ChatRepository.getAllMessages(fromid, toid);
        messages = response;
    }
    catch (error) {
        return error;
        return;
    }
    return messages;
};
ChatController.saveMessage = async (message) => {
    const ChatRepository = Chat_1.default;
    try {
        const response = await ChatRepository.saveMessage(message);
        return response;
    }
    catch (error) {
        console.log(error);
        return;
    }
};
exports.default = ChatController;
//# sourceMappingURL=ChatController.js.map