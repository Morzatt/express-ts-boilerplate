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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
// Imports 
const errors_classes_1 = require("../classes/errors.classes");
const login_1 = require("../data/login");
const validators_1 = require("./utils/validators");
// Libraries Imports
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, validators_1.validateBody)(req, validators_1.loginBodySchema);
            const { username, password } = req.body;
            const usuario = yield login_1.login.getUsuario(username);
            if (usuario === null) {
                throw new errors_classes_1.NotFoundError("El usuario no se encuentra registrado.");
            }
            const auth = yield (0, bcrypt_1.compare)(password, usuario.password);
            if (!auth) {
                throw new errors_classes_1.BadRequestError("Contraseña incorrecta.");
            }
            if (usuario.estado === "Bloqueado") {
                throw new errors_classes_1.UnauthorizedError("El usuario no puede iniciar sesión porque su acceso ha sido bloqueado.");
            }
            Reflect.deleteProperty(usuario, "password");
            const token = jsonwebtoken_1.default.sign(usuario, config_1.default.key, { expiresIn: "1d" });
            res.cookie("token", token, { httpOnly: true, secure: false });
            return res.status(200).send({ message: "Inicio de Sesión Exitoso" });
        }
        catch (err) {
            next(err);
        }
    });
}
exports.login = login;
