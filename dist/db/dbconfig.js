"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.client = void 0;
const pg_1 = require("pg");
const credentials = {
    user: 'test',
    host: 'localhost',
    database: 'test',
    password: 'test',
    port: 4000,
};
exports.client = new pg_1.Client(credentials);
exports.pool = new pg_1.Pool(credentials);
//# sourceMappingURL=dbconfig.js.map
