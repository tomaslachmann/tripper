"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const dbconfig_1 = require("../db/dbconfig");
const getUser = async (args) => {
    const values = [args.username, args.password];
    const queryText = 'SELECT * FROM Users WHERE username = $1 AND password = $2';
    try {
        const res = await dbconfig_1.pool.query(queryText, values);
        return res.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
exports.getUser = getUser;
//# sourceMappingURL=getUser.js.map