import { Router } from "express";
import UtilsController from "../controllers/utilsController";
//import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.post("/country", UtilsController.getCountry)

export default router;