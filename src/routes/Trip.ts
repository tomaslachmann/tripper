import { Router } from "express";
import { Trip } from "src/entity/Trip";
import { upload } from "./fileUpload";
import TripController from "../controllers/TripController";



const router = Router();

router.post("/create", TripController.createTrip)
router.get("/", TripController.getAll)
router.post("/request/create", TripController.createRequest)
router.post("/request/handle", TripController.handleRequest)
router.post("/reject", TripController.rejectTrip)
router.post("/search", TripController.searchTrips)
router.get("/created", TripController.getCreatedTrips)
router.get("/participated", TripController.getParticipatedTrips)
router.post("/id", TripController.getById)
router.post("/post",upload.array('file', 10) ,TripController.savePost)
router.get("/post",TripController.getPosts)
router.post("/download", TripController.downloadAttachments)

export default router;