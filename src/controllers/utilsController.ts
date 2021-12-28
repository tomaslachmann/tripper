import { Request, Response } from "express";
import utilQueries from "../queries/utilts";

class UtilsController {
  static getCountry = async (req: Request, res: Response) => {
    const { searchText } = req.body;

    //Get user from database
    const utilsRepository = utilQueries;
    
    let countries;
    try {
      const response = await utilsRepository.getCountry(searchText);
      countries = response
    } catch (error) {
      res.status(401).send(error);
      return;
    }

    //Send the jwt in the response
    res.send({
      countries:countries
    });
  };

}
export default UtilsController;