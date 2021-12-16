import { pool } from "../db/dbconfig"
//import { RequestEntity } from "src/entity/Request";


class FriendQueries{

	static SQLCommands = {
		get:{
            all:'SELECT * FROM "vFriend" WHERE "1userId" = $1',
            relation:'SELECT "2userId" as id FROM "usersRelation" WHERE "id" = $1'
        },
        delete:'SELECT "FriendDelete"($1,$2) as id'
	}

	static getAllFriends = async ( id:number ) => {
		//const { id } = user;
		const queryText = this.SQLCommands.get.all;
		const values = [id];
	
		try{
			const data = await pool.query( queryText, values );
			return data.rows;

		} catch ( err ){
			return err.stack;
		}
	}

    static removeFriend = async ( id1:number, id2:any ) => {
        const queryText = this.SQLCommands.delete;
        const values = [id1, id2.id];
        
        try{
			const data = await pool.query( queryText, values );
			return data.rows[0].id;

		} catch ( err ){
			return err.stack;
		}
    }

    static getRelation = async ( id:number ) => {
        const queryText = this.SQLCommands.get.relation;
        const values = [id];
        try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			return err.stack;
		}
    }

}

export default FriendQueries;
