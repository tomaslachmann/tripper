import { pool } from "../db/dbconfig"
import { Trip } from "src/entity/Trip";
import { query } from "express";
import { Post } from "../entity/TripPost"

class tripQueries{

	static SQLCommands = {
		get:{
			singleTrip:{
				byId:'SELECT * FROM "vTrips" WHERE id = $1 LIMIT 1',
				participants:'SELECT * FROM "tripsUsers" WHERE "tripId" = $1',
				posts:'SELECT * FROM "tripsPosts" WHERE "TripId" = $1'
			},
			createdTrips:'SELECT DISTINCT id, name, "startDate", countryname FROM "vTrips" WHERE "ownerId" = $1',
			allTrips:'SELECT * FROM "vTrips" WHERE id NOT IN (SELECT id FROM "vTrips" WHERE "userId" = $1 OR "ownerId" = $1)',
			participated:'SELECT DISTINCT id, name, "startDate", countryname FROM "vTrips" WHERE "userId" = $1 AND relation = 1'
		},
		post:{
            create:'INSERT INTO "Trips" (name, "ownerId", "iso2", "startDate", "endDate", "maxAttendees", "Comment") VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
            request:'INSERT INTO "tripsUsers" ("userId", "tripId", relation) VALUES ($1, $2, 3) RETURNING "tripId" as id',
			rejectTrip:'INSERT INTO "tripsUsers" ("userId", "tripId", relation) VALUES ($1, $2, 2) RETURNING "tripId" as id',
            handleRequest:'UPDATE "tripsUsers" SET relation=$3 WHERE "userId" = $2 AND "tripId"=$1 RETURNING "tripId"',
			searchTrip: `SELECT * FROM "vTrips" WHERE id NOT IN (SELECT id FROM "vTrips" WHERE "userId" = $1 OR "ownerId" = $1)`,
			post:'INSERT INTO "tripsPosts" ("TripId", "UserId", "Text", "attachments") VALUES ($1, $2, $3, $4::jsonb) RETURNING *'
        },
		search:{
			startDate:` AND "startDate" >= `,
			endDate:' AND "endDate" <= ',
			maxAttendees:' AND "maxAttendees" <= ',
			destination:' AND iso2 = '
		}
	}

	static generateQuery = (trip:Trip) => {	
		const searchQuery = {
			command: ""
		}
		if(trip.destination && typeof trip.destination !== "undefined"){
			searchQuery.command += this.SQLCommands.search.destination + `'${trip.destination}'`;
		}
		if(trip.startDate && typeof trip.startDate !== "undefined"){
			searchQuery.command += this.SQLCommands.search.startDate + `'${trip.startDate}'`;
		}
		if(trip.endDate && typeof trip.endDate !== "undefined"){
			searchQuery.command += this.SQLCommands.search.endDate + `'${trip.endDate}'`;
		}
		if(trip.maxAttendees && typeof trip.maxAttendees != "undefined"){
			searchQuery.command += this.SQLCommands.search.maxAttendees + `'${trip.maxAttendees}'`;
		}
		return searchQuery.command;
	}

	
	static createTrip = async ( trip:Trip ) => {

		const { name, ownerId, destination, startDate, endDate, maxAttendees, description } = trip;
		const queryText = this.SQLCommands.post.create;
		const values = [name, ownerId, destination, startDate, endDate, maxAttendees, description];

		try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			console.log( err.stack )
		}
	} 

    static getAll = async (id:number) => {
        const queryText = this.SQLCommands.get.allTrips;
        
        try{
			const data = await pool.query( queryText, [id] );
			return data.rows;

		} catch ( err ){
			console.log( err.stack )
		}
    }

	static getCreatedTrips = async (id:number) => {
        const queryText = this.SQLCommands.get.createdTrips;
        
        try{
			const data = await pool.query( queryText, [id] );
			return data.rows;

		} catch ( err ){
			console.log( err.stack )
		}
    }

	static getPosts = async (id:number) => {
        const queryText = this.SQLCommands.get.singleTrip.posts;
        
        try{
			const data = await pool.query( queryText, [id] );
			return data.rows;

		} catch ( err ){
			console.log( err.stack )
		}
    }

	static savePost = async (post:Post) => {
        const queryText = this.SQLCommands.post.post;
        const { tripId, userId, text, attachments } = post;

		const values = [tripId, userId, text, attachments ];
	
        try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			console.log( err.stack )
		}
    }

	static getParticipatedTrips = async (id:number) => {
        const queryText = this.SQLCommands.get.participated;
        
        try{
			const data = await pool.query( queryText, [id] );
			return data.rows;

		} catch ( err ){
			console.log( err.stack )
		}
    }

    static createRequest = async (userId:number, tripId:number) => {
        const queryText = this.SQLCommands.post.request;
        const values = [userId, tripId]
        console.log(queryText, values)
        try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			console.log( err.stack )
		}
    }

	static rejectTrip = async (userId:number, tripId:number) => {
        const queryText = this.SQLCommands.post.request;
        const values = [userId, tripId]
        console.log(queryText, values)
        try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			console.log( err.stack )
		}
    }

	static searchTrips = async (trip:Trip) => {
        let queryText = this.SQLCommands.post.searchTrip;
        const searchQuery = this.generateQuery(trip);
		queryText += searchQuery
		console.log(searchQuery, [trip.ownerId])
        try{
			const data = await pool.query( queryText, [trip.ownerId] );
			return data.rows;

		} catch ( err ){
			console.log( err.stack )
		}
    }

    static handleRequest = async (userId:number, tripId:number, relation:number, requestId:number) => {
        const queryText = this.SQLCommands.post.handleRequest;
        const values = [userId, tripId, relation, requestId]
        
        try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){ 
			console.log( err.stack)
		}
    }

    static getById = async (tripId:number) => {
        const queryText = this.SQLCommands.get.singleTrip.byId;
        const values = [tripId]
        
        try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			console.log( err.stack )
		}
    }

	static getParticipants = async (tripId:number) => {
        const queryText = this.SQLCommands.get.singleTrip.participants;
        const values = [tripId]
        
        try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			console.log( err.stack )
		}
    }
}

export default tripQueries;
