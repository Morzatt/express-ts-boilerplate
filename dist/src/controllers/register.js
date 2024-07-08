"use strict";
// Server's side logic for the register function of the app
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.saveSecurityQuestions = exports.sendSecurityQuestions = exports.register = exports.preguntasDeSeguridad = exports.hashPwd = void 0;
// Imports
const register_1 = require("../data/register");
const login_1 = require("../data/login");
const validators_1 = require("./utils/validators");
// Libraries Import
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = __importDefault(require("bcrypt"));
const errors_1 = require("../classes/errors");
const hashPwd = (pwd) => {
    const saltRounds = 10;
    const salt = bcrypt_2.default.genSaltSync(saltRounds);
    const hash = bcrypt_2.default.hashSync(pwd, salt);
    return hash;
};
exports.hashPwd = hashPwd;
exports.preguntasDeSeguridad = [
    "Nombre de su Abuela Paterna",
    "Nombre de su Primera Mascota",
    "Titulo de su Libro Favorito",
    "Comida Favorita",
    "Pelicula Favorita",
    "Profesion de su Padre",
    "Profesion de su Madre",
    "Color Favorito"
];
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, validators_1.validateBody)(req, validators_1.registerUserSchema);
            const userData = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                username: req.body.username,
                password: (0, exports.hashPwd)(req.body.password),
            };
            const DBUser = yield login_1.login.getUser(userData.username);
            if (DBUser !== null) {
                throw new errors_1.BadRequestError("El usuario ya se encuentra registrado");
            }
            yield register_1.register.insertUser(userData);
            return res.status(200).send({ message: `Usuario ${userData.username} correctamente registrado.` });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.register = register;
// 
function sendSecurityQuestions(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = req.query.username;
            if (username === undefined) {
                return res.status(200).send({ preguntas: exports.preguntasDeSeguridad });
            }
            const usuario = yield login_1.login.getUser(username);
            if (usuario === null) {
                throw new errors_1.NotFoundError("No se encuentra el usuario especificado.");
            }
            const userSecurityQuestions = yield register_1.register.getSecurityQuestions(username);
            if (userSecurityQuestions === null || undefined) {
                throw new errors_1.NotFoundError("El usuario no tiene preguntas de seguridad registradas.");
            }
            return res.status(200).send(userSecurityQuestions);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.sendSecurityQuestions = sendSecurityQuestions;
// 
function saveSecurityQuestions(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const usuario = yield login_1.login.getUser(req.body.usuario);
            if (usuario === null) {
                throw new errors_1.NotFoundError("No se encuentra el usuario especificado.");
            }
            const preguntasDeSeguridad = {
                usuario: usuario.id,
                pregunta1: req.body.pregunta1,
                respuesta1: (0, exports.hashPwd)(req.body.respuesta1),
                pregunta2: req.body.pregunta2,
                respuesta2: (0, exports.hashPwd)(req.body.respuesta2)
            };
            yield register_1.register.insertSecurityQuestions(preguntasDeSeguridad);
            res.status(200).send({ message: "Preguntas de Seguridad insertadas correctamente" });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.saveSecurityQuestions = saveSecurityQuestions;
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newData = {
            username: req.body.username,
            password: (0, exports.hashPwd)(req.body.newPassword),
            pregSeg1: req.body.pregSeg1,
            pregSeg2: req.body.pregSeg2
        };
        const usuario = yield login_1.login.getUser(newData.username);
        const securityQuestions = yield register_1.register.getSecurityQuestions(usuario[0].id);
        const result1 = yield (0, bcrypt_1.compare)(newData.pregSeg1, securityQuestions[0].respuesta1);
        const result2 = yield (0, bcrypt_1.compare)(newData.pregSeg2, securityQuestions[0].respuesta2);
        if (usuario !== null) {
            if (result1 && result2) {
                try {
                    yield register_1.register.changePassword(newData);
                    res.status(200).send({
                        message: `Contraseña del usuario: ${newData.username}, correctamente cambiada.`,
                        err: null
                    });
                    return;
                }
                catch (err) {
                    res.status(400).send({
                        message: `Ha ocurrido un error al intentar cambiar la contraseña del usuario ${newData.username}.Intente nuevamente.`,
                        err: err
                    });
                    throw err;
                }
            }
            else {
                res.status(400).send({
                    message: "Las respuestas a sus preguntas seguridad no coinciden. Revise sus respuestas e intente de nuevo",
                    err: null
                });
            }
        }
        else {
            res.status(400).send({
                message: "El usuario no se encuentra registrado.",
                err: null
            });
        }
    });
}
exports.changePassword = changePassword;
