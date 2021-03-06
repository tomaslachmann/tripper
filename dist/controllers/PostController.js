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
const Post_1 = __importDefault(require("../queries/Post"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
class PostController {
}
_a = PostController;
PostController.get = async (req, res) => {
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
    const postRepository = Post_1.default;
    let posts;
    try {
        const response = await postRepository.getAll(userId);
        posts = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        posts: posts
    });
};
PostController.create = async (req, res) => {
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
    let post;
    post = req.body;
    post.userId = userId;
    const postRepository = Post_1.default;
    try {
        const response = await postRepository.createPost(post);
        post = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        posts: post
    });
};
exports.default = PostController;
//# sourceMappingURL=PostController.js.map