import { Request, Response } from "express";
import userQueries from "../queries/User";
import { validate } from "class-validator";

import { User } from "../entity/User";

class UserController{
/*
static listAll = async (req: Request, res: Response) => {
  //Get users from database
  const userRepository = new userQueries();
  const users = await userRepository.getUser(req.body);

  //Send the users object
  res.send(users);
};
*/
static getOneById = async (req: Request, res: Response) => {
  //Get the ID from the url

  const id: number = parseInt(req.params.id);
  const user = new User;
  user.id = id;
  //Get the user from database
  const userRepository = userQueries;
  
  try {
    const response = await userRepository.getById(user);
    res.send(response)
  } catch (error) {
    res.status(404).send("User not found");
  }
};

static newUser = async (req: Request, res: Response) => {
  //Get parameters from the body
  let { username, password, email, firstName, lastName } = req.body;
  let user = new User();
  user.username = username;
  user.password = password;
  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;

  //Validade if the parameters are ok
  const errors = await validate(user);

  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Hash the password, to securely store on DB
  user.hashPassword();

  
  //Try to save. If fails, the username is already in use
  const userRepository = userQueries;
  
  try {
    const response = await userRepository.register(user);
    res.send(response)
    return;
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }

  //If all ok, send 201 response
  res.status(201).send("User created");
};

static editUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id: number = parseInt(req.params.id);

  //Get values from the body
  const { email } = req.body;

  //Try to find user on database
  const userRepository = userQueries;
  let user = new User;
  user.email = email;
  user.id = id;
  try {
    user = await userRepository.getById(user);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send("User not found");
    return;
  }

  //Validate the new values on model
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Try to safe, if fails, that means username already in use
 /* try {
    await userRepository.save(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }*/
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};

static deleteUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = parseInt(req.params.id);

  const userRepository = userQueries;
  let user = new User;

  user.id = id;

  try {
    const response = await userRepository.getById(user);
    const del = await userRepository.delete(response);
    res.send(del)
  } catch (error) {
    res.status(404).send("User not found");
    return;
  }

  

  //After all send a 204 (no content, but accepted) response
 // res.status(204);
 // res.send("Uživatel smazán");
};
};

export default UserController;