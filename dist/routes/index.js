"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const request_1 = __importDefault(require("./request"));
const friend_1 = __importDefault(require("./friend"));
const socket_1 = __importDefault(require("./socket"));
const Trip_1 = __importDefault(require("./Trip"));
const Utils_1 = __importDefault(require("./Utils"));
const routes = (0, express_1.Router)();
routes.use("/request", request_1.default);
routes.use("/auth", auth_1.default);
routes.use("/user", user_1.default);
routes.use("/friend", friend_1.default);
routes.use("/Chat", socket_1.default);
routes.use("/Trip", Trip_1.default);
routes.use("/utils", Utils_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map