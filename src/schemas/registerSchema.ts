import { buildSchema } from "graphql";

export const registerSchema = buildSchema(`
    type Query {
        register(username: String!, password: String!): registerUser
    }

    type registerUser {
        username: String!
        password: String!
        id: Int!
    }
`);
