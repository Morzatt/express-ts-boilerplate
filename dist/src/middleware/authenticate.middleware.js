"use strict";
// Middleware to authenticate user when accessing protected routes
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
const config_1 = __importDefault(require("../config"));
const errors_classes_1 = require("../classes/errors.classes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies["token"];
            if (!token) {
                throw new errors_classes_1.UnauthorizedError();
            }
            const usuario = jsonwebtoken_1.default.verify(token, config_1.default.key);
            if (!usuario) {
                throw new errors_classes_1.BadRequestError();
            }
            req.body.user = usuario;
            next();
        }
        catch (err) {
            next(err);
        }
    });
}
exports.default = authenticate;
