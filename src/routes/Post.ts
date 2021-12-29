import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();

router.post("/create", PostController.create)
router.get("/", PostController.get)

export default router;