"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TripController_1 = __importDefault(require("../controllers/TripController"));
const router = (0, express_1.Router)();
router.post("/create", TripController_1.default.createTrip);
router.get("/", TripController_1.default.getAll);
router.post("/request/create", TripController_1.default.createRequest);
router.post("/request/handle", TripController_1.default.handleRequest);
router.post("/reject", TripController_1.default.rejectTrip);
router.post("/search", TripController_1.default.searchTrips);
router.get("/created", TripController_1.default.getCreatedTrips);
router.get("/participated", TripController_1.default.getParticipatedTrips);
router.post("/id", TripController_1.default.getById);
exports.default = router;
//# sourceMappingURL=Trip.js.map