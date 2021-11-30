"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const dbconfig_1 = require("../db/dbconfig");
class userQueries {
}
_a = userQueries;
userQueries.SQLCommands = {
    get: {
        singleUser: {
            byId: 'SELECT * FROM Users WHERE id = $1 LIMIT 1',
            byUsername: 'SELECT id, username, password, email FROM Users WHERE Username = $1 LIMIT 1',
            byUsernamePassword: 'SELECT * FROM Users WHERE Username = $1 AND Password = $2 LIMIT 1',
            byEmail: 'SELECT * FROM Users WHERE Email = $1'
        },
        multipleUsers: {
            getAll: 'SELECT * FROM Users'
        }
    },
    post: {
        singleUser: {
            register: 'SELECT uspIUUser(0,$1,$2,$3) as id',
            changePassword: 'UPDATE "users" SET "password" = $1, "modifiedAt" = NOW() WHERE "id" = $2 RETURNING *',
            changeEmail: 'UPDATE Users SET Email = $1, modifiedAt = NOW() WHERE ID = $2',
            delete: 'SELECT "deleteUser"($1) as id'
        }
    }
};
userQueries.getByUsername = async (user) => {
    const { username } = user;
    const queryText = _a.SQLCommands.get.singleUser.byUsername;
    const values = [username];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        return err.stack;
    }
};
userQueries.getByUsernamePassword = async (user) => {
    const { username, password } = user;
    const queryText = _a.SQLCommands.get.singleUser.byUsernamePassword;
    const values = [username, password];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
userQueries.getByEmail = async (user) => {
    const { email } = user;
    const queryText = _a.SQLCommands.get.singleUser.byEmail;
    const values = [email];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
userQueries.getById = async (user) => {
    const { id } = user;
    const queryText = _a.SQLCommands.get.singleUser.byId;
    const values = [id];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
userQueries.register = async (user) => {
    const { username, password, email } = user;
    const queryText = _a.SQLCommands.post.singleUser.register;
    const values = [username, password, email];
    try {
        const res = await dbconfig_1.pool.query(queryText, values);
        return res.rows[0];
    }
    catch (err) {
        return err.stack;
    }
};
userQueries.delete = async (user) => {
    const { id } = user;
    const queryText = _a.SQLCommands.post.singleUser.delete;
    const values = [id];
    try {
        const res = await dbconfig_1.pool.query(queryText, values);
        return res.rows[0];
    }
    catch (err) {
        return err.stack;
    }
};
userQueries.changeEmail = async (user) => {
    const { id, email } = user;
    const queryText = _a.SQLCommands.post.singleUser.changeEmail;
    const values = [id, email];
    try {
        const res = await dbconfig_1.pool.query(queryText, values);
        return res.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
userQueries.changePassword = async (user) => {
    const { id, password } = user;
    const queryText = _a.SQLCommands.post.singleUser.changePassword;
    const values = [password, id];
    try {
        const res = await dbconfig_1.pool.query(queryText, values);
        return res.rows[0];
    }
    catch (err) {
        return err.stack;
    }
};
exports.default = userQueries;
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
//# sourceMappingURL=User.js.map