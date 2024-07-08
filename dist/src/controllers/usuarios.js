"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlockUser = exports.blockUser = exports.deleteUser = exports.editUser = exports.getUsers = void 0;
const usuarios_1 = require("../data/usuarios");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            if (id !== "*") {
                const usuario = yield (0, usuarios_1.usuarios)().getUser(id);
                return res.send(usuario[0]);
            }
            const usuarios = yield (0, usuarios_1.usuarios)().getUsers();
            return res.send(usuarios);
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al buscar los usuarios",
                err: err
            });
        }
    });
}
exports.getUsers = getUsers;
function editUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (id === undefined || null || "") {
            return res.status(400).send({
                message: "No se ha seleccionado ningun usuario."
            });
        }
        const nombre = req.query.nombre;
        const apellido = req.query.apellido;
        const username = req.query.username;
        try {
            const usuario = yield (0, usuarios_1.usuarios)().getUser(id);
            yield (0, usuarios_1.usuarios)().editUser(id, (nombre ? nombre : usuario[0].nombre), (apellido ? apellido : usuario[0].apellido), (username ? username : usuario[0].username));
            res.status(200).send({
                message: "Datos del Usuario editados correctamente."
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar editar el usuario.",
                err: err
            });
        }
    });
}
exports.editUser = editUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (id === undefined || null || "") {
            return res.status(400).send({
                message: "No se ha seleccionado ningun usuario."
            });
        }
        try {
            yield (0, usuarios_1.usuarios)().deleteUser(id);
            res.status(200).send({
                message: "Usuario eliminado correctamente."
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar editar el usuario.",
                err: err
            });
        }
    });
}
exports.deleteUser = deleteUser;
function blockUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (id === undefined || null || "") {
            return res.status(400).send({
                message: "No se ha seleccionado ningun usuario."
            });
        }
        try {
            yield (0, usuarios_1.usuarios)().blockUser(id);
            res.status(200).send({
                message: "Usuario bloqueado correctamente."
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar editar el usuario.",
                err: err
            });
        }
    });
}
exports.blockUser = blockUser;
function unlockUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        if (id === undefined || null || "") {
            return res.status(400).send({
                message: "No se ha seleccionado ningun usuario."
            });
        }
        try {
            yield (0, usuarios_1.usuarios)().unlockUser(id);
            res.status(200).send({
                message: "Usuario desbloqueado correctamente."
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar editar el usuario.",
                err: err
            });
        }
    });
}
exports.unlockUser = unlockUser;
