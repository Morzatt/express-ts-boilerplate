"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = void 0;
const express_1 = require("express");
const usuarios_1 = require("../../controllers/usuarios");
exports.usuarios = (0, express_1.Router)();
exports.usuarios.get("/:id", (req, res) => {
    try {
        (0, usuarios_1.getUsers)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
exports.usuarios.patch("/:id", (req, res) => {
    try {
        (0, usuarios_1.editUser)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
exports.usuarios.delete("/:id", (req, res) => {
    try {
        (0, usuarios_1.deleteUser)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
exports.usuarios.get("/block/:id", (req, res) => {
    try {
        (0, usuarios_1.blockUser)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
exports.usuarios.get("/unlock/:id", (req, res) => {
    try {
        (0, usuarios_1.unlockUser)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
