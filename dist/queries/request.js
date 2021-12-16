"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../db/dbconfig");
class RequestQueries {
}
_a = RequestQueries;
RequestQueries.SQLCommands = {
    get: 'SELECT * FROM "vFriendRequest" WHERE "toUserId" = $1',
    handle: 'SELECT "handleFriendRequest"($1,$2) as id',
};
RequestQueries.getRequests = async (id) => {
    const queryText = _a.SQLCommands.get;
    const values = [id];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows;
    }
    catch (err) {
        return err.stack;
    }
};
RequestQueries.handleRequest = async (id, type) => {
    const queryText = _a.SQLCommands.handle;
    const values = [id, type];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0].id;
    }
    catch (err) {
        return err.stack;
    }
};
exports.default = RequestQueries;
//# sourceMappingURL=request.js.map