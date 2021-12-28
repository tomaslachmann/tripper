"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SocketController_1 = __importDefault(require("../controllers/SocketController"));
const router = (0, express_1.Router)();
router.get("/*", SocketController_1.default.get);
router.post("/", SocketController_1.default.send);
exports.default = router;
//# sourceMappingURL=socket.js.map