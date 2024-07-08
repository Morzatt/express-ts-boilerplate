"use strict";
// Routes and configuration for the logout route
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const express_1 = require("express");
const logout_controller_1 = require("../../controllers/logout.controller");
exports.logout = (0, express_1.Router)();
exports.logout.get("/", logout_controller_1.logout);
