"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../db/dbconfig");
class ChatQueries {
}
_a = ChatQueries;
ChatQueries.SQLCommands = {
    get: {
        all: 'SELECT * FROM "messages" WHERE ("toid" = $1 AND "fromid" = $2) OR ("fromid" = $1 AND "toid" = $2)'
    },
    post: {
        save: 'INSERT INTO "messages" ("fromid", "toid", "message") VALUES ($1, $2, $3) RETURNING *'
    }
};
ChatQueries.getAllMessages = async (fromid, toid) => {
    const queryText = _a.SQLCommands.get.all;
    const values = [fromid, toid];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows;
    }
    catch (err) {
        return err.stack;
    }
};
ChatQueries.saveMessage = async (message) => {
    const queryText = _a.SQLCommands.post.save;
    const { fromid, toid, text } = message;
    const values = [fromid, toid, text];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows;
    }
    catch (err) {
        return err.stack;
    }
};
exports.default = ChatQueries;
//# sourceMappingURL=Chat.js.map