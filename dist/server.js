"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const registerSchema_1 = require("./schemas/registerSchema");
const login_1 = require("./queries/login");
const register_1 = require("./queries/register");
const loginSchema_1 = require("./schemas/loginSchema");
const app = (0, express_1.default)();
const PORT = 4001;
var root = {
    register: register_1.registerUser,
    login: login_1.loginUser
};
app.use("/register", (0, express_graphql_1.graphqlHTTP)({
    schema: registerSchema_1.registerSchema,
    rootValue: root,
    graphiql: true
}));
app.use("/login", (0, express_graphql_1.graphqlHTTP)({
    schema: loginSchema_1.loginSchema,
    rootValue: root,
    graphiql: true
}));
app.get('/', function (Request, Response) {
    Response.send("Hola Tripper!");
});
app.listen(PORT, () => {
    console.log("server běží");
});
//# sourceMappingURL=server.js.map