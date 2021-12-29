import { pool } from "../db/dbconfig"
import { Post } from "../entity/Post";

class postQueries{

	static SQLCommands = {
		post:{
            create:'INSERT INTO posts ("userId", "Text") VALUES ($1, $2) RETURNING *'
        },
        get:{
            allPosts: 'SELECT * FROM posts WHERE "userId" IN (SELECT "1userId", "2userId" WHERE "2userId" = $1 OR "1userId" = $1 AND "relationId" = 1)'
        }
	}

	
	static createPost = async ( post:Post ) => {

		const { userId, text } = post;
		const queryText = this.SQLCommands.post.create;
		const values = [userId, text];

		try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			console.log( err.stack )
		}
	} 

    static getAll = async (id:number) => {
        const queryText = this.SQLCommands.get.allPosts;
        
        try{
			const data = await pool.query( queryText, [id] );
			return data.rows;

		} catch ( err ){
			console.log( err.stack )
		}
    }


}

export default postQueries;
