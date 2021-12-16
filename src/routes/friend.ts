import { Router } from "express";
import FriendController from "../controllers/FriendController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//get friend requests route
router.get("/", FriendController.getAllFriends);
router.delete("/", FriendController.deleteFriend);

export default router;