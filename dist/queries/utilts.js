"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dbconfig_1 = require("../db/dbconfig");
class utilQueries {
}
_a = utilQueries;
utilQueries.SQLCommands = {
    get: {
        country: "SELECT * FROM countries WHERE lower(name) LIKE lower($1) ORDER BY name asc LIMIT 5"
    }
};
utilQueries.getCountry = async (input) => {
    const queryText = _a.SQLCommands.get.country;
    const values = [input + '%'];
    try {
        const data = await dbconfig_1.pool.query(queryText, values);
        return data.rows;
    }
    catch (err) {
        return err.stack;
    }
};
exports.default = utilQueries;
//# sourceMappingURL=utilts.js.map