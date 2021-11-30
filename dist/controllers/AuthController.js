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
const jwt = __importStar(require("jsonwebtoken"));
const class_validator_1 = require("class-validator");
const User_1 = __importDefault(require("../queries/User"));
const User_2 = require("../entity/User");
const config_1 = __importDefault(require("../config/config"));
class AuthController {
}
_a = AuthController;
AuthController.login = async (req, res) => {
    let { username, password } = req.body;
    if (!(username && password)) {
        res.status(400).send();
    }
    const userRepository = User_1.default;
    let user = new User_2.User;
    try {
        const response = await userRepository.getByUsername(req.body);
        user.init(response);
    }
    catch (error) {
        res.status(401).send();
    }
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).send("špatně zadané heslo");
        return;
    }
    const token = jwt.sign({ userId: user.id, username: user.username }, config_1.default.jwtSecret, { expiresIn: "1h" });
    res.send(token);
};
AuthController.changePassword = async (req, res) => {
    const id = res.locals.jwtPayload.userId;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        res.status(400).send();
    }
    const userRepository = User_1.default;
    let user = new User_2.User;
    user.id = id;
    try {
        const response = await userRepository.getById(user);
        user.init(response);
    }
    catch (id) {
        res.status(401).send();
    }
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        res.status(401).send();
        return;
    }
    user.password = newPassword;
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    user.hashPassword();
    try {
        const response = await userRepository.changePassword(user);
        res.status(200).send(response);
        return;
    }
    catch (err) {
        res.status(500).send("nastala chyba");
        return;
    }
};
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map