import { Router } from "express";
import ChatController from "../controllers/SocketController";

const router = Router();
//get friend requests route
router.get("/*", ChatController.get);
router.post("/", ChatController.send);



export default router;