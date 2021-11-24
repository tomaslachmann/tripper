"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const graphql_1 = require("graphql");
exports.loginSchema = (0, graphql_1.buildSchema)(`
    type Query {
        login(username: String!, password: String!): User
    }

    type User {
        username: String!
        password: String!
        id: Int!
    }
`);
//# sourceMappingURL=loginSchema.js.map