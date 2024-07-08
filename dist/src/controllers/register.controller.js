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
exports.changePassword = exports.registerSecurityQuestions = exports.sendSecurityQuestions = exports.register = exports.preguntasDeSeguridad = exports.hashPwd = void 0;
// Imports
const register_1 = require("../data/register");
const login_1 = require("../data/login");
const validators_1 = require("./utils/validators");
const errors_classes_1 = require("../classes/errors.classes");
// Libraries Import
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = __importDefault(require("bcrypt"));
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
            const DBUser = yield login_1.login.getUsuario(userData.username);
            if (DBUser !== null) {
                throw new errors_classes_1.BadRequestError("El usuario ya se encuentra registrado");
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
            const usuario = yield login_1.login.getUsuario(username);
            if (usuario === null) {
                throw new errors_classes_1.NotFoundError("No se encuentra el usuario especificado.");
            }
            const userSecurityQuestions = yield register_1.register.getSecurityQuestions(usuario.id);
            if (userSecurityQuestions === null) {
                throw new errors_classes_1.NotFoundError("El usuario no tiene preguntas de seguridad registradas.");
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
function registerSecurityQuestions(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, validators_1.validateBody)(req, validators_1.registerSQSchema.omit({ newPassword: true }));
            const preguntasDeSeguridad = {
                usuario: req.body.usuario,
                preg_1: req.body.preg_1,
                res_1: (0, exports.hashPwd)(req.body.res_1),
                preg_2: req.body.preg_2,
                res_2: (0, exports.hashPwd)(req.body.res_2)
            };
            yield register_1.register.insertSecurityQuestions(preguntasDeSeguridad);
            res.status(200).send({ message: "Preguntas de Seguridad insertadas correctamente" });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.registerSecurityQuestions = registerSecurityQuestions;
function changePassword(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, validators_1.validateBody)(req, validators_1.registerSQSchema.omit({
                preg_1: true,
                preg_2: true
            }));
            const newData = {
                usuario: req.body.usuario,
                password: (0, exports.hashPwd)(req.body.newPassword),
                res_1: req.body.res_1,
                res_2: req.body.res_2
            };
            const usuario = yield login_1.login.getUsuario(newData.usuario);
            if (usuario === null) {
                throw new errors_classes_1.NotFoundError("No se encuentra el usuario especificado.");
            }
            const securityQuestions = yield register_1.register.getSecurityQuestions(usuario.id);
            if (securityQuestions === null) {
                throw new errors_classes_1.NotFoundError("El usuario no tiene preguntas de seguridad registradas.");
            }
            const result1 = yield (0, bcrypt_1.compare)(newData.res_1, securityQuestions.res_1);
            if (!result1) {
                throw new errors_classes_1.UnauthorizedError("La Pregunta de Seguridad #1 no coincide.");
            }
            const result2 = yield (0, bcrypt_1.compare)(newData.res_2, securityQuestions.res_2);
            if (!result2) {
                throw new errors_classes_1.UnauthorizedError("La Pregunta de Seguridad #2 no coincide.");
            }
            yield register_1.register.changePassword(newData);
            return res.status(200).send({ message: `Contraseña correctamente cambiada.` });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.changePassword = changePassword;
