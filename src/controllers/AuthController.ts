import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import userQueries from "../queries/User";

import { User } from "../entity/User";
import config from "../config/config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = userQueries;
    let user = new User;
    try {
      const response = await userRepository.getByUsername(req.body);
      user.init(response)     
    } catch (error) {
      res.status(401).send();
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send("špatně zadané heslo");
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.send(token);
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = userQueries;
    let user = new User;
    user.id = id;
    try {
      const response = await userRepository.getById(user);
      user.init(response)
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }
    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    
    //Hash the new password and save
    user.hashPassword();
    try{
      const response = await userRepository.changePassword(user);
      res.status(200).send(response)
      return;
    } catch(err){
      res.status(500).send("nastala chyba");
      return;
    }
  };
}
export default AuthController;