import { Request, Response } from "express";
import tripQueries from "../queries/Trip";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { Trip } from "../entity/Trip";
import { Post } from "../entity/TripPost";




class TripController {
  static createTrip = async (req: Request, res: Response) => {
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

    let trip:Trip;

    trip = req.body;
    trip.ownerId = userId
    

    //Get user from database
    const tripRepository = tripQueries;
    let trips;
    try {
      const response = await tripRepository.createTrip(trip);
      trips = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      trips:trips
    });
  };

  static getAll = async (req: Request, res: Response) => {
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

    const { userId } = jwtPayload;

    //Get user from database
    const tripRepository = tripQueries;
    let trip;
    try {
      const response = await tripRepository.getAll(userId);
      trip = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      trips:trip
    });
  };

  static getById = async (req: Request, res: Response) => {
    //Check if username and password are set
    const { id } = req.body

    //Get user from database
    const tripRepository = tripQueries;
    let trip, participants;
    try {
      const response = await tripRepository.getById(id);
      participants = await tripRepository.getParticipants(id);
      trip = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    res.send({
      trips:trip,
      participants:participants
    });
  };

  static getCreatedTrips = async (req: Request, res: Response) => {
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

    const { userId } = jwtPayload;

    //Get user from database
    const tripRepository = tripQueries;
    let trip;
    try {
      const response = await tripRepository.getCreatedTrips(userId);
      trip = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      trips:trip
    });
  };

  static getParticipatedTrips = async (req: Request, res: Response) => {
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

    const { userId } = jwtPayload;

    //Get user from database
    const tripRepository = tripQueries;
    let trip;
    try {
      const response = await tripRepository.getParticipatedTrips(userId);
      trip = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      trips:trip
    });
  };

  static getPosts = async (req: Request, res: Response) => {
    
    const { id } = req.body;
    //Get user from database
    const tripRepository = tripQueries;
    let posts;
    try {
      const response = await tripRepository.getPosts(id);
      posts = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      posts:posts
    });
  };

  static savePost = async (req: Request, res: Response) => {
    
    let post: Post;
    post = req.body
    //Get user from database
    const tripRepository = tripQueries;
    let posts;
    try {
      const response = await tripRepository.getPosts(id);
      posts = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      posts:posts
    });
  };

  static searchTrips = async (req: Request, res: Response) => {
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

    const { userId } = jwtPayload;

    let trip:Trip;

    trip = req.body;
    trip.ownerId = userId;

    //Get user from database
    const tripRepository = tripQueries;
    let trips;
   
    try {
      const response = await tripRepository.searchTrips(trip);
      trips = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      trips:trips
    });
  };

  static createRequest = async (req: Request, res: Response) => {
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

    const { userId } = jwtPayload;
    const { id } = req.body;
    

    //Get user from database
    const tripRepository = tripQueries;
    let trip;
    try {
      const response = await tripRepository.createRequest(userId, id);
      trip = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      trips:trip
    });
  };

  static rejectTrip = async (req: Request, res: Response) => {
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

    const { userId } = jwtPayload;
    const { id } = req.body;
    

    //Get user from database
    const tripRepository = tripQueries;
    let trip;
    try {
      const response = await tripRepository.rejectTrip(userId, id);
      trip = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      trips:trip
    });
  };

  static handleRequest = async (req: Request, res: Response) => {
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

    const { userId, tripId, relation, requestId } = req.body;

    //Get user from database
    const tripRepository = tripQueries;
    let trip;
    try {
      const id = await tripRepository.handleRequest(userId, tripId, relation, requestId);
      const response = await tripRepository.getById(id.id)
      trip = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      trips:trip
    });
  };

}
export default TripController;