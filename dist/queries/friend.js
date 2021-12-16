"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../db/dbconfig");
class FriendQueries {
}
_a = FriendQueries;
FriendQueries.SQLCommands = {
    get: {
        all: 'SELECT * FROM "vFriend" WHERE "1userId" = $1',
        relation: 'SELECT "2userId" as id FROM "usersRelation" WHERE "id" = $1'
    },
    delete: 'SELECT "FriendDelete"($1,$2) as id'
};
FriendQueries.getAllFriends = async (id) => {
    const queryText = _a.SQLCommands.get.all;
    const values = [id];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows;
    }
    catch (err) {
        return err.stack;
    }
};
FriendQueries.removeFriend = async (id1, id2) => {
    const queryText = _a.SQLCommands.delete;
    const values = [id1, id2.id];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0].id;
    }
    catch (err) {
        return err.stack;
    }
};
FriendQueries.getRelation = async (id) => {
    const queryText = _a.SQLCommands.get.relation;
    const values = [id];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        return err.stack;
    }
};
exports.default = FriendQueries;
//# sourceMappingURL=friend.js.map