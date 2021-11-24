import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { registerSchema } from "./schemas/registerSchema";
import { loginUser } from "./queries/login";
import { registerUser } from "./queries/register";
import { loginSchema } from "./schemas/loginSchema";

//express initialization
const app = express();

//PORT
const PORT:number = 4001;

// The root provides a resolver function for each API endpoint
var root = {
  register: registerUser,
  login: loginUser
};

//graphql playground setup code
app.use(
  "/register",
  graphqlHTTP({
    schema: registerSchema,
    rootValue: root,
    graphiql: true
  })
);

app.use(
  "/login",
  graphqlHTTP({
    schema: loginSchema,
    rootValue: root,
    graphiql: true
  })
);

app.get('/', function(Request, Response){
  Response.send("Hola Tripper!")
})

//localhost setup
app.listen(PORT, () => {
    console.log("server běží")
});