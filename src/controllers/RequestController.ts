import { Request, Response } from "express";
import RequestQueries from "../queries/request";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { RequestEntity } from "../entity/Request";



class RequestController {
  static get = async (req: Request, res: Response) => {
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
    const requestRepository = RequestQueries;
    let request = new RequestEntity;

    try {
      const response = await requestRepository.getRequests(userId);
      request = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      request:request
    });
  };

  static handle = async (req: Request, res: Response) => {
    
    const { id, type } = req.body;

    //Get user from database
    const requestRepository = RequestQueries;
    let request = new RequestEntity;
  
    try {
      const userId = await requestRepository.handleRequest(id, type);
      const response = await requestRepository.getRequests(userId);
      request = response

    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      request:request
    });
  };

}
export default RequestController;