"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../db/dbconfig");
class postQueries {
}
_a = postQueries;
postQueries.SQLCommands = {
    post: {
        create: 'INSERT INTO posts ("userId", "Text") VALUES ($1, $2) RETURNING *'
    },
    get: {
        allPosts: 'SELECT * FROM posts WHERE "userId" IN (SELECT "1userId", "2userId" WHERE "2userId" = $1 OR "1userId" = $1 AND "relationId" = 1)'
    }
};
postQueries.createPost = async (post) => {
    const { userId, text } = post;
    const queryText = _a.SQLCommands.post.create;
    const values = [userId, text];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows[0];
    }
    catch (err) {
        console.log(err.stack);
    }
};
postQueries.getAll = async (id) => {
    const queryText = _a.SQLCommands.get.allPosts;
    try {
        const data = await dbconfig_1.pool.query(queryText, [id]);
        return data.rows;
    }
    catch (err) {
        console.log(err.stack);
    }
};
exports.default = postQueries;
//# sourceMappingURL=Post.js.map