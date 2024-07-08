// 3
// Sets the dotenv configuration, imports its values
// and finally exports it as an better formatted object

import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    SECRET_KEY,
    DBHOST,
    DBUSER,
    DBPWD,
    DBNAME,
    DBPORT,
    PINO_LOG_LEVEL
} = process.env;

const COOKIE_CONFIG = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    signed: true // Indicates if the cookie should be signed
}

assert(PORT)
assert(HOST)
assert(SECRET_KEY)

export default {
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
}