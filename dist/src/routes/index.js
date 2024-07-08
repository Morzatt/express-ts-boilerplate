"use strict";
// Creates the main route of the application, and imports all the routes to then exports it as an object to be
// received in the main server.ts file
Object.defineProperty(exports, "__esModule", { value: true });
exports.backup = exports.logout = exports.login = exports.register = exports.main = void 0;
const express_1 = require("express");
const register_1 = require("./register");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return register_1.register; } });
const login_1 = require("./login");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return login_1.login; } });
const logout_1 = require("./logout");
Object.defineProperty(exports, "logout", { enumerable: true, get: function () { return logout_1.logout; } });
const backup_1 = require("./backup");
Object.defineProperty(exports, "backup", { enumerable: true, get: function () { return backup_1.backup; } });
const main = (0, express_1.Router)();
exports.main = main;
main.get("/", (req, res) => {
    res.send("<h1>Main Page!</h1>");
});
