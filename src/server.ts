import express, { Request, response, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schemas/schema";
import { client } from "./db/dbconfig"
import { Pool, Client } from "pg";

//express initialization
const app = express();

//PORT
const PORT:number = 4000;

var users = [
  {
    id: 1,
    username: 'Brian',
    password: '21'
  },
  {
    id: 2,
    username: 'Brian',
    password: '21'
  }
]

interface UserInterface {
  id: number
}

const getUser = (args:UserInterface) => {
  var userID = args.id;
  return users.filter(user => user.id == userID)[0];
}

// The root provides a resolver function for each API endpoint
var root = {
  user: getUser
};

const credentials = {
  user: 'tomaslachmanngmailcom_2093',
  host: 'store5.rosti.cz',
  database: 'tomaslachmanngmailcom_2093',
  password: 'Lachty25051995',
  port: 5432,
};

const poolDemo = async () => {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT NOW()");
  await pool.end();

  return now;
}

async function clientDemo() {
  const client = new Client(credentials);
  await client.connect();
  const now = await client.query("SELECT NOW()");
  await client.end();

  return now;
}

//graphql playground setup code
app.use(
  "/register",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.get('/', function(Request, Response){
  let res = clientDemo()
  Response.send(res)
})

//localhost setup
app.listen(PORT, async () => {
    console.log("server běží")
});