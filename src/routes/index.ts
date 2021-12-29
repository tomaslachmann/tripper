import { Router/*, Request, Response */} from "express";
import auth from "./auth";
import user from "./user";
import request from "./request";
import friend from "./friend";
import Chat from "./socket";
import Trip from "./Trip"
import Utils from "./Utils"
import Post from "./Post"
import router from "./auth";

const routes = Router();

routes.use("/request", request);
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/friend", friend);
routes.use("/Chat", Chat)
routes.use("/Trip", Trip)
routes.use("/utils", Utils)
router.use("/post", Post)

export default routes;