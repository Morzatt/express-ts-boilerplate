"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.usuarios = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    nombre: (0, pg_core_1.text)('nombre').notNull(),
    apellido: (0, pg_core_1.text)("apellido").notNull(),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull()
});
