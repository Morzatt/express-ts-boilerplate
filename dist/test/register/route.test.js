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
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../src/server"));
(0, vitest_1.describe)("ALL ROUTES INSDE THE /register PATH", () => {
    (0, vitest_1.describe)("POST TO /register", () => {
        // BASIC REGISTER AS AN ADMINISTRATOR
        (0, vitest_1.test)("BASIC REGISTRATION OF AN ADMINISTRATOR", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).post("/register").send({
                nombre: "",
                apellido: "",
                username: "",
                password: "",
                role: "Administrador"
            });
            (0, vitest_1.expect)(response.status).toBe(400);
        }));
    });
});
