"use strict";
// Utilities to supply a permission to visualize the content of the pages in the client only if the user's logged.
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
exports.newRenderPermission = void 0;
function newRenderPermission(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = req.session;
        if (session.userInfo) {
            res.status(200).send(session.userInfo);
        }
        else {
            res.status(400).send("No hay permiso");
        }
    });
}
exports.newRenderPermission = newRenderPermission;
