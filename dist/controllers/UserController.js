"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../queries/User"));
const class_validator_1 = require("class-validator");
const User_2 = require("../entity/User");
class UserController {
}
_a = UserController;
UserController.getOneById = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = new User_2.User;
    user.id = id;
    const userRepository = User_1.default;
    try {
        const response = await userRepository.getById(user);
        res.send(response);
    }
    catch (error) {
        res.status(404).send("User not found");
    }
};
UserController.newUser = async (req, res) => {
    let { username, password, email } = req.body;
    let user = new User_2.User();
    user.username = username;
    user.password = password;
    user.email = email;
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    user.hashPassword();
    const userRepository = User_1.default;
    try {
        const response = await userRepository.register(user);
        res.send(response);
        return;
    }
    catch (e) {
        res.status(409).send("username already in use");
        return;
    }
    res.status(201).send("User created");
};
UserController.editUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { email } = req.body;
    const userRepository = User_1.default;
    let user = new User_2.User;
    user.email = email;
    user.id = id;
    try {
        user = await userRepository.getById(user);
    }
    catch (error) {
        res.status(404).send("User not found");
        return;
    }
    const errors = await (0, class_validator_1.validate)(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }
    res.status(204).send();
};
UserController.deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const userRepository = User_1.default;
    let user = new User_2.User;
    user.id = id;
    try {
        const response = await userRepository.getById(user);
        const del = await userRepository.delete(response);
        res.send(del);
    }
    catch (error) {
        res.status(404).send("User not found");
        return;
    }
};
;
exports.default = UserController;
//# sourceMappingURL=userController.js.map