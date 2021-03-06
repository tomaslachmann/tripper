"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
exports.schema = (0, graphql_1.buildSchema)(`
    
    type Query {
        user(id: Int!): User,
        register(username: String!, password: String!): registerUser
    }

    type registerUser {
        username: String!
        password: String!
        id: Int!
    }

    type User {
        id: Int
        username: String!
        password: String!
    }
`);
//# sourceMappingURL=schema.js.map