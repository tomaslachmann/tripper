import { Request, Response } from "express";
import PostQueries from "../queries/Post";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { Post } from "../entity/Post";



class PostController {
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
    const postRepository = PostQueries;
    let posts;
    try {
      const response = await postRepository.getAll(userId);
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

  static create = async (req: Request, res: Response) => {
        
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

    let post:Post;
    post = req.body;
    post.userId = userId

    //Get user from database
    const postRepository = PostQueries;
  
    try {
      const response = await postRepository.createPost(post);
      post = response

    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      posts:post
    });
  };

}
export default PostController;