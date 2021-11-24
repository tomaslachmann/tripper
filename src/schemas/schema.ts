import { buildSchema } from "graphql";

export const schema = buildSchema(`
    
    type Query {
        user(id: Int!): User
    }

    type User {
        id: Int
        username: String!
        password: String!
    }
`);
