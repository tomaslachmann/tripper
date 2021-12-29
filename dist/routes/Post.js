"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = __importDefault(require("../controllers/PostController"));
const router = (0, express_1.Router)();
router.post("/create", PostController_1.default.create);
router.get("/", PostController_1.default.get);
exports.default = router;
//# sourceMappingURL=Post.js.map