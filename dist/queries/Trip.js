"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../db/dbconfig");
class tripQueries {
}
_a = tripQueries;
tripQueries.SQLCommands = {
    get: {
        singleTrip: {
            byId: 'SELECT * FROM "vTrips" WHERE id = $1 LIMIT 1',
            participants: 'SELECT * FROM "tripsUsers" WHERE "tripId" = $1',
            posts: 'SELECT * FROM "tripsPosts" WHERE "tripId" = $1'
        },
        createdTrips: 'SELECT DISTINCT id, name, "startDate", countryname FROM "vTrips" WHERE "ownerId" = $1',
        allTrips: 'SELECT * FROM "vTrips" WHERE id NOT IN (SELECT id FROM "vTrips" WHERE "userId" = $1 OR "ownerId" = $1)',
        participated: 'SELECT DISTINCT id, name, "startDate", countryname FROM "vTrips" WHERE "userId" = $1 AND relation = 1'
    },
    post: {
        create: 'INSERT INTO "Trips" (name, "ownerId", "iso2", "startDate", "endDate", "maxAttendees", "Comment") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
        request: 'INSERT INTO "tripsUsers" ("userId", "tripId", relation) VALUES ($1, $2, 3) RETURNING "tripId" as id',
        rejectTrip: 'INSERT INTO "tripsUsers" ("userId", "tripId", relation) VALUES ($1, $2, 2) RETURNING "tripId" as id',
        handleRequest: 'UPDATE "tripsUsers" SET relation=$3 WHERE "userId" = $2 AND "tripId"=$1 RETURNING "tripId"',
        searchTrip: `SELECT * FROM "vTrips" WHERE id NOT IN (SELECT id FROM "vTrips" WHERE "userId" = $1 OR "ownerId" = $1)`,
        post: 'INSERT INTO "tripsPosts" ("TripId", "UserId", "Text", "attachments") VALUES ($1,$2,$3,$4) RETURNING id'
    },
    search: {
        startDate: ` AND "startDate" >= `,
        endDate: ' AND "endDate" <= ',
        maxAttendees: ' AND "maxAttendees" <= ',
        destination: ' AND iso2 = '
    }
};
tripQueries.generateQuery = (trip) => {
    const searchQuery = {
        command: ""
    };
    if (trip.destination && typeof trip.destination !== "undefined") {
        searchQuery.command += _a.SQLCommands.search.destination + `'${trip.destination}'`;
    }
    if (trip.startDate && typeof trip.startDate !== "undefined") {
        searchQuery.command += _a.SQLCommands.search.startDate + `'${trip.startDate}'`;
    }
    if (trip.endDate && typeof trip.endDate !== "undefined") {
        searchQuery.command += _a.SQLCommands.search.endDate + `'${trip.endDate}'`;
    }
    if (trip.maxAttendees && typeof trip.maxAttendees != "undefined") {
        searchQuery.command += _a.SQLCommands.search.maxAttendees + `'${trip.maxAttendees}'`;
    }
    return searchQuery.command;
};
tripQueries.createTrip = async (trip) => {
    const { name, ownerId, destination, startDate, endDate, maxAttendees, description } = trip;
    const queryText = _a.SQLCommands.post.create;
    const values = [name, ownerId, destination, startDate, endDate, maxAttendees, description];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.getAll = async (id) => {
    const queryText = _a.SQLCommands.get.allTrips;
    try {
        const data = await dbconfig_1.pool.query(queryText, [id]);
        return data.rows;
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.getCreatedTrips = async (id) => {
    const queryText = _a.SQLCommands.get.createdTrips;
    try {
        const data = await dbconfig_1.pool.query(queryText, [id]);
        return data.rows;
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.getPosts = async (id) => {
    const queryText = _a.SQLCommands.get.singleTrip.posts;
    try {
        const data = await dbconfig_1.pool.query(queryText, [id]);
        return data.rows;
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.savePost = async (post) => {
    const queryText = _a.SQLCommands.post.post;
    const { tripId, userId, text, attachments } = post;
    const values = [tripId, userId, text, attachments];
    try {
        const data = await dbconfig_1.pool.query(queryText, [values]);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.getParticipatedTrips = async (id) => {
    const queryText = _a.SQLCommands.get.participated;
    try {
        const data = await dbconfig_1.pool.query(queryText, [id]);
        return data.rows;
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.createRequest = async (userId, tripId) => {
    const queryText = _a.SQLCommands.post.request;
    const values = [userId, tripId];
    console.log(queryText, values);
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.rejectTrip = async (userId, tripId) => {
    const queryText = _a.SQLCommands.post.request;
    const values = [userId, tripId];
    console.log(queryText, values);
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.searchTrips = async (trip) => {
    let queryText = _a.SQLCommands.post.searchTrip;
    const searchQuery = _a.generateQuery(trip);
    queryText += searchQuery;
    console.log(searchQuery, [trip.ownerId]);
    try {
        const data = await dbconfig_1.pool.query(queryText, [trip.ownerId]);
        return data.rows;
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.handleRequest = async (userId, tripId, relation, requestId) => {
    const queryText = _a.SQLCommands.post.handleRequest;
    const values = [userId, tripId, relation, requestId];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.getById = async (tripId) => {
    const queryText = _a.SQLCommands.get.singleTrip.byId;
    const values = [tripId];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
tripQueries.getParticipants = async (tripId) => {
    const queryText = _a.SQLCommands.get.singleTrip.participants;
    const values = [tripId];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
exports.default = tripQueries;
//# sourceMappingURL=Trip.js.map