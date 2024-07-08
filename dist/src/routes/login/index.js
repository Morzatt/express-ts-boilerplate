"use strict";
// Routes and configuration for the login route 
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const login_controller_1 = require("../../controllers/login.controller");
exports.login = (0, express_1.Router)();
exports.login.post("/", login_controller_1.login);
