"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FriendController_1 = __importDefault(require("../controllers/FriendController"));
const router = (0, express_1.Router)();
router.get("/", FriendController_1.default.getAllFriends);
router.delete("/", FriendController_1.default.deleteFriend);
exports.default = router;
//# sourceMappingURL=friend.js.map