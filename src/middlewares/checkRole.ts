import { Response/*, NextFunction, Request*/ } from "express";
//import { getRepository } from "typeorm";

//import { User } from "../entity/User";

export const checkRole = (roles: Array<string>) => {
  return async (res: Response/*req: Request, res: Response, next: NextFunction*/) => {
    //Get the user ID from previous midleware
  //  const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    //onst userRepository = getRepository(User);
    /*let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) next();
    else res.status(401).send();*/
    res.status(200).send(roles);
  };
};