import express, { Request, Response } from "express";

import * as cors from "cors";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import routes from "./routes";

//express initialization
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/", routes);

//PORT
const PORT:number = 4001;

app.use("/", routes);

app.get('/', function(Request, Response){
  Response.send("Hola Tripper!")
})

//localhost setup
app.listen(PORT, () => {
    console.log("server běží")
});