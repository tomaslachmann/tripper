"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const dbconfig_1 = require("../db/dbconfig");
const registerUser = async (args) => {
    const values = [args.username, args.password];
    const queryText = 'INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING *';
    try {
        const res = await dbconfig_1.pool.query(queryText, values);
        return res.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=register.js.map