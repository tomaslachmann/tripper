"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const graphql_1 = require("graphql");
exports.registerSchema = (0, graphql_1.buildSchema)(`
    type Query {
        register(username: String!, password: String!): registerUser
    }

    type registerUser {
        username: String!
        password: String!
        id: Int!
    }
`);
//# sourceMappingURL=registerSchema.js.map