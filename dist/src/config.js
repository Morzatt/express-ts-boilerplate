"use strict";
// 3
// Sets the dotenv configuration, imports its values
// and finally exports it as an better formatted object
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const assert_1 = __importDefault(require("assert"));
dotenv_1.default.config();
const { PORT, HOST, HOST_URL, SECRET_KEY, DBHOST, DBUSER, DBPWD, DBNAME, DBPORT, PINO_LOG_LEVEL } = process.env;
const COOKIE_CONFIG = {
    maxAge: 1000 * 60 * 15,
    signed: true // Indicates if the cookie should be signed
};
(0, assert_1.default)(PORT);
(0, assert_1.default)(HOST);
(0, assert_1.default)(SECRET_KEY);
exports.default = {
    port: PORT,
    host: HOST,
    hostURL: HOST_URL,
    key: SECRET_KEY,
    cookieConfig: COOKIE_CONFIG,
    dbhost: DBHOST,
    dbuser: DBUSER,
    dbpwd: DBPWD,
    dbname: DBNAME,
    dbport: DBPORT,
    logLevel: PINO_LOG_LEVEL
};
