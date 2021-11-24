import { pool } from "../db/dbconfig"

interface UserInterface {
    id: number,
    username:String,
    password:String
}

export const loginUser = async (args:UserInterface) => {
    const values = [args.username, args.password];
    const queryText = 'SELECT * FROM Users WHERE username = $1 AND password = $2';

    try {
        const res = await pool.query(queryText, values)
        return res.rows[0]

      } catch (err) {
        console.log(err.stack)
      }
}