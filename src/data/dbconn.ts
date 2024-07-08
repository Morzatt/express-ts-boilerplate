// Database connection and set up

import mysql from "mysql2";
import { Kysely, MysqlDialect } from 'kysely'
import type { Database } from "./types";
import config from "../config"; 

const connConfig = {
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpwd,
    database: config.dbname,
    port: 3307 
}

export let pool = mysql.createPool(connConfig).promise();

// Kysely instance
const dialect = new MysqlDialect({ pool: mysql.createPool(connConfig) })
export const db = new Kysely<Database>({ dialect })