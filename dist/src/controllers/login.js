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
exports.login = void 0;
const login_1 = require("../data/login");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const session = req.session;
        // Check if there's an user with the provided username stored in the database
        const DBUser = yield login_1.login.getUser(username);
        if (DBUser !== null) { // If there's an user, proceed with the login
            try {
                // Check if the usernames and passwords coincide. 
                const auth = yield login_1.login.authUser(username, password);
                // If indeed both username and password coincide:
                if (auth) {
                    if (DBUser[0].estado !== "Bloqueado") {
                        session.userInfo = DBUser[0];
                        return res.status(200).send({
                            message: "Inicio de Sesión Exitoso",
                            err: null
                        });
                    }
                    else {
                        return res.status(400).send({
                            message: "El usuario no puede iniciar sesión porque su acceso ha sido bloqueado por el Administrador."
                        });
                    }
                }
                else {
                    console.log("Something went wrong: User cannot be logged");
                    res.status(400).send({
                        message: "Los datos proporcionados no son correctos; verifique e intente nuevamente",
                        err: null
                    });
                }
            }
            catch (err) {
                console.log(`There was an error when login the user: ${err}`);
                res.status(400).send({
                    message: "Ha ocurrido un error al iniciar sesión, intente nuevamente",
                    err: err
                });
                throw err;
            }
        }
        else {
            console.log("No user found");
            res.status(400).send({
                message: "El usuario especificado no existe, verifique e intente de nuevo",
                err: null
            });
        }
    });
}
exports.login = login;
