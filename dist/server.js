"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schemas/schema");
const pg_1 = require("pg");
const app = (0, express_1.default)();
const PORT = 4000;
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
];
const getUser = (args) => {
    var userID = args.id;
    return users.filter(user => user.id == userID)[0];
};
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
    const pool = new pg_1.Pool(credentials);
    const now = await pool.query("SELECT NOW()");
    await pool.end();
    return now;
};
async function clientDemo() {
    const client = new pg_1.Client(credentials);
    await client.connect();
    const now = await client.query("SELECT NOW()");
    await client.end();
    return now;
}
app.use("/register", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.schema,
    rootValue: root,
    graphiql: true
}));
app.get('/', function (Request, Response) {
    let res = clientDemo();
    Response.send(res);
});
app.listen(PORT, async () => {
    console.log("server běží");
});
//# sourceMappingURL=server.js.map