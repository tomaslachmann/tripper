import { pool } from "../db/dbconfig"
//import { RequestEntity } from "src/entity/Request";


class utilQueries{

	static SQLCommands = {
		get:{
            country:"SELECT * FROM countries WHERE lower(name) LIKE lower($1) ORDER BY name asc LIMIT 5"
        }
	}

	static getCountry = async ( input:string ) => {
		//const { id } = user;
		const queryText = this.SQLCommands.get.country;
		const values = [input + '%'];

		try{
			const data = await pool.query( queryText, values );
			return data.rows;

		} catch ( err ){
			return err.stack;
		}
	}

}

export default utilQueries;
