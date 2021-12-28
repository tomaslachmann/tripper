import { pool } from "../db/dbconfig"
import { User } from "src/entity/User";

class userQueries{

	static SQLCommands = {
		get:{
			singleUser:{
				byId:'SELECT * FROM Users WHERE id = $1 LIMIT 1',
				byUsername:'SELECT id, username, password, email FROM Users WHERE Username = $1 LIMIT 1',
				byUsernamePassword:'SELECT * FROM Users WHERE Username = $1 AND Password = $2 LIMIT 1',
				byEmail:'SELECT * FROM Users WHERE Email = $1'
			},
			multipleUsers:{
				getAll:'SELECT * FROM Users'
			}
		},
		post:{
			singleUser:{
				register:'SELECT uspIUUser(0,$1,$2,$3,$4,$5) as id',
				changePassword:'UPDATE "users" SET "password" = $1, "modifiedAt" = NOW() WHERE "id" = $2 RETURNING *',
				changeEmail:'UPDATE Users SET Email = $1, modifiedAt = NOW() WHERE ID = $2',
				delete:'SELECT "deleteUser"($1) as id'
			}
		}
	}

	static getByUsername = async ( user:User ) => {
		const { username } = user;
		const queryText = this.SQLCommands.get.singleUser.byUsername;
		const values = [username];
	
		try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			return err.stack;
		}
	}

	static getByUsernamePassword = async ( user:User ) => {

		const { username, password } = user;
		const queryText = this.SQLCommands.get.singleUser.byUsernamePassword;
		const values = [username, password];

		try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			console.log( err.stack )
		}
	} 

	static getByEmail = async ( user:User ) => {

		const { email } = user;
		const queryText = this.SQLCommands.get.singleUser.byEmail;
		const values = [email];

		try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			console.log( err.stack )
		}
	}

	static getById = async ( user:User ) => {

		const { id } = user;
		const queryText = this.SQLCommands.get.singleUser.byId;
		const values = [id];

		try{
			const data = await pool.query( queryText, values );
			return data.rows[0];

		} catch ( err ){
			console.log( err.stack )
		}
	}

	static register = async ( user:User ) => {
		
		const { username, password, email, firstName, lastName } = user;
		const queryText = this.SQLCommands.post.singleUser.register;
		const values = [username, password, email, firstName, lastName];
		//return [queryText, values]
		try {
			const res = await pool.query(queryText, values)
			return res.rows[0]

		} catch (err) {
			return err.stack
		}
	}

	static delete = async ( user:User ) => {

		const { id } = user;
		const queryText = this.SQLCommands.post.singleUser.delete;
		const values = [id];

		try {
			const res = await pool.query(queryText, values)
			return res.rows[0]

		} catch (err) {
			return err.stack
		}
	}

	static changeEmail = async ( user:User ) => {

		const { id, email } = user;
		const queryText = this.SQLCommands.post.singleUser.changeEmail;
		const values = [id, email];

		try {
			const res = await pool.query(queryText, values)
			return res.rows[0]

		} catch (err) {
			console.log(err.stack)
		}
	}

	static changePassword = async ( user:User ) => {

		const { id, password } = user;
		const queryText = this.SQLCommands.post.singleUser.changePassword;
		const values = [password, id];
		
		try {
			const res = await pool.query(queryText, values)
			return res.rows[0]

		} catch (err) {
			return err.stack
		}
	}
}

export default userQueries;

export const getUser = async (args:User) => {
    const values = [args.username, args.password];
    const queryText = 'SELECT * FROM Users WHERE username = $1 AND password = $2';

    try {
        const res = await pool.query(queryText, values)
        return res.rows[0]

      } catch (err) {
        console.log(err.stack)
      }
}