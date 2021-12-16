"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const friend_1 = __importDefault(require("../queries/friend"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
class FriendController {
}
_a = FriendController;
FriendController.getAllFriends = async (req, res) => {
    const token = req.headers["x-access-token"];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId } = jwtPayload;
    const requestRepository = friend_1.default;
    let friends;
    try {
        const response = await requestRepository.getAllFriends(userId);
        friends = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        friends: friends
    });
};
FriendController.deleteFriend = async (req, res) => {
    const token = req.headers["x-access-token"];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId } = jwtPayload;
    const { id } = req.body;
    const FriendRepository = friend_1.default;
    let friends;
    try {
        const response = await FriendRepository.getRelation(id);
        const resId = await FriendRepository.removeFriend(userId, response);
        const resFinal = await FriendRepository.getAllFriends(resId);
        friends = resFinal;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        friends: friends
    });
};
exports.default = FriendController;
//# sourceMappingURL=FriendController.js.map