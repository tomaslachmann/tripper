import express, { Request, Response } from "express";

//express initialization
const app = express();

//PORT
const PORT:number = 4000;

app.get("/", (req: Request, res: Response) => {
    res.send(`${req}.Hello World!`);
});

//localhost setup
app.listen(PORT, () => {
  console.log("Graphql server now up at port 4000")
});