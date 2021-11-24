import { buildSchema } from "graphql";

export const loginSchema = buildSchema(`
    type Query {
        login(username: String!, password: String!): User
    }

    type User {
        username: String!
        password: String!
        id: Int!
    }
`);
