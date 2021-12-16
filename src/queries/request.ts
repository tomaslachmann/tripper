import { pool } from "../db/dbconfig"
//import { RequestEntity } from "src/entity/Request";
import { User } from "src/entity/User";

class RequestQueries{

	static SQLCommands = {
		get:'SELECT * FROM "vFriendRequest" WHERE "toUserId" = $1',
		handle:'SELECT "handleFriendRequest"($1,$2) as id',
	}

	static getRequests = async ( id:number ) => {
		//const { id } = user;
		const queryText = this.SQLCommands.get;
		const values = [id];
	
		try{
			const data = await pool.query( queryText, values );
			return data.rows;

		} catch ( err ){
			return err.stack;
		}
	}
 // @param type 1 - accept
	static handleRequest = async ( id:number, type:number ) => {
		const queryText = this.SQLCommands.handle;
		const values = [id, type];
	
		try{
			const data = await pool.query( queryText, values );
			return data.rows[0].id;

		} catch ( err ){
			return err.stack;
		}
	}

}

export default RequestQueries;
