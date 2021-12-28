"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Trip_1 = __importDefault(require("../queries/Trip"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
class TripController {
}
_a = TripController;
TripController.createTrip = async (req, res) => {
    const token = req.headers["x-access-token"];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId } = jwtPayload;
    let trip;
    trip = req.body;
    trip.ownerId = userId;
    const tripRepository = Trip_1.default;
    let trips;
    try {
        const response = await tripRepository.createTrip(trip);
        trips = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        trips: trips
    });
};
TripController.getAll = async (req, res) => {
    const token = req.headers["x-access-token"];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId } = jwtPayload;
    const tripRepository = Trip_1.default;
    let trip;
    try {
        const response = await tripRepository.getAll(userId);
        trip = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        trips: trip
    });
};
TripController.getById = async (req, res) => {
    const { id } = req.body;
    const tripRepository = Trip_1.default;
    let trip, participants;
    try {
        const response = await tripRepository.getById(id);
        participants = await tripRepository.getParticipants(id);
        trip = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        trips: trip,
        participants: participants
    });
};
TripController.getCreatedTrips = async (req, res) => {
    const token = req.headers["x-access-token"];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId } = jwtPayload;
    const tripRepository = Trip_1.default;
    let trip;
    try {
        const response = await tripRepository.getCreatedTrips(userId);
        trip = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        trips: trip
    });
};
TripController.getParticipatedTrips = async (req, res) => {
    const token = req.headers["x-access-token"];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId } = jwtPayload;
    const tripRepository = Trip_1.default;
    let trip;
    try {
        const response = await tripRepository.getParticipatedTrips(userId);
        trip = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        trips: trip
    });
};
TripController.getPosts = async (req, res) => {
    const { id } = req.body;
    const tripRepository = Trip_1.default;
    let posts;
    try {
        const response = await tripRepository.getPosts(id);
        posts = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        posts: posts
    });
};
TripController.savePost = async (req, res) => {
    let post;
    post = req.body;
    const tripRepository = Trip_1.default;
    let posts;
    try {
        const response = await tripRepository.getPosts(id);
        posts = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        posts: posts
    });
};
TripController.searchTrips = async (req, res) => {
    const token = req.headers["x-access-token"];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId } = jwtPayload;
    let trip;
    trip = req.body;
    trip.ownerId = userId;
    const tripRepository = Trip_1.default;
    let trips;
    try {
        const response = await tripRepository.searchTrips(trip);
        trips = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        trips: trips
    });
};
TripController.createRequest = async (req, res) => {
    const token = req.headers["x-access-token"];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId } = jwtPayload;
    const { id } = req.body;
    const tripRepository = Trip_1.default;
    let trip;
    try {
        const response = await tripRepository.createRequest(userId, id);
        trip = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        trips: trip
    });
};
TripController.rejectTrip = async (req, res) => {
    const token = req.headers["x-access-token"];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId } = jwtPayload;
    const { id } = req.body;
    const tripRepository = Trip_1.default;
    let trip;
    try {
        const response = await tripRepository.rejectTrip(userId, id);
        trip = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        trips: trip
    });
};
TripController.handleRequest = async (req, res) => {
    const token = req.headers["x-access-token"];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(401).send();
        return;
    }
    const { userId, tripId, relation, requestId } = req.body;
    const tripRepository = Trip_1.default;
    let trip;
    try {
        const id = await tripRepository.handleRequest(userId, tripId, relation, requestId);
        const response = await tripRepository.getById(id.id);
        trip = response;
    }
    catch (error) {
        res.status(401).send(error);
        return;
    }
    res.send({
        trips: trip
    });
};
exports.default = TripController;
//# sourceMappingURL=TripController.js.map