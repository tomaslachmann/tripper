"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.client = void 0;
const pg_1 = require("pg");
const credentials = {
    user: 'tomaslachmanngmailcom_2093',
    host: 'localhost',
    database: 'tomaslachmanngmailcom_2093',
    password: 'Lachty25051995',
    port: 4000,
};
exports.client = new pg_1.Client(credentials);
exports.pool = new pg_1.Pool(credentials);
//# sourceMappingURL=dbconfig.js.map