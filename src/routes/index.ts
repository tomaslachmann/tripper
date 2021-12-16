import { Router/*, Request, Response */} from "express";
import auth from "./auth";
import user from "./user";
import request from "./request";
import friend from "./friend";

const routes = Router();

routes.use("/request", request);
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/friend", friend)

export default routes;