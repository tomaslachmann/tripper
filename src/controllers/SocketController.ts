import { Request, Response } from "express";




class ChatController {
  static get = async (req: Request, res: Response) => {
    //Check if username and password are set
    var io = req.app.get('socketio');
    console.log(req.app)
    io.emit("hola")
    res.send("hola")
    //io.emit("hello world");
  }

  static send = async (req: Request, res: Response) => {
    var io = req.app.get('socketio');
    io.on ('send-message', function (msg:any) {
      //io.sockets.emit ('', msg);
      console.log(msg) 
      res.send(msg)
    });
    //io.emit("hello world");
  }

}
export default ChatController;