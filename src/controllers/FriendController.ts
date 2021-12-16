import { Request, Response } from "express";
import FriendQueries from "../queries/friend";
import * as jwt from "jsonwebtoken";
import config from "../config/config";




class FriendController {
  static getAllFriends = async (req: Request, res: Response) => {
    //Check if username and password are set
    
    const token = <string>req.headers["x-access-token"];
    let jwtPayload;
    
    //Try to validate the token and get data
    try {
      jwtPayload = <any>jwt.verify(token, config.jwtSecret);
      
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }
  
    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId } = jwtPayload;

    //Get user from database
    const requestRepository = FriendQueries;
    let friends;
    try {
      const response = await requestRepository.getAllFriends(userId);
      friends = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      friends:friends
    });
  };

  static deleteFriend = async (req: Request, res: Response) => {
    //Check if username and password are set
    
    const token = <string>req.headers["x-access-token"];
    let jwtPayload;
    
    //Try to validate the token and get data
    try {
      jwtPayload = <any>jwt.verify(token, config.jwtSecret);
      
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }
  
    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId } = jwtPayload;
    const { id } = req.body;

    //Get user from database
    const FriendRepository = FriendQueries;
    let friends;
    try {
        const response = await FriendRepository.getRelation(id);
        const resId = await FriendRepository.removeFriend(userId, response);
        const resFinal = await FriendRepository.getAllFriends(resId);
        friends = resFinal
        
      } catch (error) {
        res.status(401).send(error);
        return;
      }
  
      //Send the jwt in the response
      res.send({
        friends:friends
      });
  } 

}
export default FriendController;