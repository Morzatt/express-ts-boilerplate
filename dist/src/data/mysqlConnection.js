"use strict";
// Database connection and set up
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.pool = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const kysely_1 = require("kysely");
const config_1 = __importDefault(require("../config"));
const connConfig = {
    host: config_1.default.dbhost,
    user: config_1.default.dbuser,
    password: config_1.default.dbpwd,
    database: config_1.default.dbname,
    port: 3307
};
exports.pool = mysql2_1.default.createPool(connConfig).promise();
// Kysely instance
const dialect = new kysely_1.MysqlDialect({ pool: mysql2_1.default.createPool(connConfig) });
exports.db = new kysely_1.Kysely({ dialect });
