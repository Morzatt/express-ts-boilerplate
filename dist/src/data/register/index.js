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
exports.register = void 0;
const dbconn_1 = require("../dbconn");
exports.register = {
    insertUser: (usuario) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield dbconn_1.db.insertInto("usuarios").values(usuario).executeTakeFirstOrThrow();
        }
        catch (err) {
            throw err;
        }
    }),
    insertSecurityQuestions: (pregSeg) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield dbconn_1.db.insertInto("preguntas").values(pregSeg).execute();
        }
        catch (err) {
            throw err;
        }
    }),
    getSecurityQuestions: (usuario) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pregSeg = yield dbconn_1.db.selectFrom("preguntas").where("usuario", "=", usuario).selectAll().execute();
            if (pregSeg === undefined) {
                return null;
            }
            return pregSeg[0];
        }
        catch (err) {
            throw err;
        }
    }),
    changePassword: (newData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield dbconn_1.db.updateTable("usuarios").set({ password: newData.password }).where("id", "=", newData.usuario).execute();
            return;
        }
        catch (err) {
            throw err;
        }
    })
};
