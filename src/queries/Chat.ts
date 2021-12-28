import { pool } from "../db/dbconfig"
import { Message } from "../entity/Message"
//import { RequestEntity } from "src/entity/Request";


class ChatQueries{

	static SQLCommands = {
		get:{
            all:'SELECT * FROM "messages" WHERE ("toid" = $1 AND "fromid" = $2) OR ("fromid" = $1 AND "toid" = $2)'
        },
        post:{
            save:'INSERT INTO "messages" ("fromid", "toid", "message") VALUES ($1, $2, $3) RETURNING *'
        }
	}

	static getAllMessages = async ( fromid:number, toid:number ) => {
		//const { id } = user;
		const queryText = this.SQLCommands.get.all;
		const values = [fromid, toid];
	
		try{
			const data = await pool.query( queryText, values );
			return data.rows;

		} catch ( err ){
			return err.stack;
		}
	}

    static saveMessage = async ( message:Message ) => {
        const queryText = this.SQLCommands.post.save;
        const { fromid, toid, text } = message;
        const values = [fromid, toid, text];
        try{
			const data = await pool.query( queryText, values );
			return data.rows;

		} catch ( err ){
			return err.stack;
		}        
    }

}

export default ChatQueries;
