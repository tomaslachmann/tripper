import { pool } from "../db/dbconfig"

interface UserInterface {
    id: number,
    username:String,
    password:String
}

export const registerUser = async (args:UserInterface) => {
    const values = [args.username, args.password];
    const queryText = 'INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING *';

    try {
        const res = await pool.query(queryText, values)
        return res.rows[0]

      } catch (err) {
        console.log(err.stack)
      }
}