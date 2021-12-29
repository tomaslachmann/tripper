import express, { Request, response, Response } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import ChatController from "./controllers/ChatController";
import { Message } from "./entity/Message"
import routes from "./routes";


//express initialization
const app = express();


app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpServer = createServer(app);

//PORT
const PORT:number = 4001;

const io = new Server(httpServer, {  
    path: '/Chat',
    cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.use((socket, next) => {
    socket.id = socket.handshake.auth.id;
    next();
});

app.use("/", routes);

app.use("/", routes);

app.get('/', function(Request, Response){
  Response.send("Hola Tripper!")
})

let users:any = []
const removeDuplicates = (arr:any) => {
    return arr.filter((arr:any, index:any, self:any) =>
    index === self.findIndex((t:any) => (t.ID === arr.ID)))
}

io.on("connection", function (socket) {
    for (let [id, socket] of io.of("/").sockets) {
        users = users.filter((user:any) => user.UserID !== socket.handshake.auth.id)
        users.push({
        ID: id,
        UserID: socket.handshake.auth.id,
        name: socket.handshake.auth.name
        });
    }
 
    socket.emit("users", [...new Set(removeDuplicates(users))]);
    
    console.log("connect",removeDuplicates(users))
    socket.on('open-chat', async (data) => {
        let { from, to } = data;
        const toid = users.filter((user:any) => user.ID === to) 
        const response = await ChatController.getAllMessages(from, toid[0].UserID)
        socket.emit('get-messages', {from:to,[to]:response})
    })

    socket.on('send-message', async ({message, to}) => {
      
      const data = new Message;
      let toid = users.filter((user:any) => user.ID === to)
      data.toid = toid[0].UserID
      data.fromid = socket.handshake.auth.id;
      data.text = message;
      const response = await ChatController.saveMessage(data);
      socket.emit('message',{from:to,[to]:response});
      socket.to(to).emit('message', {from:socket.id,[socket.id]:response});
    });
    
    socket.on("disconnect", function(socket){
        console.log("disconnect:", socket)
    }) 
});



//localhost setup
httpServer.listen(PORT, () => {
    console.log("server běží")
});