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
const dbconn_1 = require("../dbconn");
exports.login = {
    getUsuario: (username) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usuario = yield dbconn_1.db.selectFrom("usuarios").where("username", '=', username).selectAll().executeTakeFirst();
            if (usuario === undefined) {
                return null;
            }
            return usuario;
        }
        catch (err) {
            throw err;
        }
    }),
};
