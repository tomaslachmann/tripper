import { Router } from "express";
import RequestController from "../controllers/RequestController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//get friend requests route
router.get("/", RequestController.get);
router.post("/handle", [checkJwt], RequestController.handle)

export default router;