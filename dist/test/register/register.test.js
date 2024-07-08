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
// Test Utilities
const vitest_1 = require("vitest");
const vitest_2 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
// Test Units
const server_1 = __importDefault(require("../../src/server"));
const index_1 = require("../../src/data/register/index");
const login_1 = require("../../src/data/login");
// Mocks setup
// GetUser Mock
const getUserMock = login_1.login.getUsuario = vitest_1.vi.fn();
// Insert User Mock
const insertMock = index_1.register.insertUser = vitest_1.vi.fn();
insertMock.mockImplementation((userdata) => {
    return new Promise((resolve, reject) => {
        return resolve();
    });
});
(0, vitest_1.describe)("CREATE USERS", () => {
    (0, vitest_2.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    // Should register users if everything is correct
    (0, vitest_1.test)("SHOULD REGISTER USER, RETURN 200", () => __awaiter(void 0, void 0, void 0, function* () {
        getUserMock.mockResolvedValue(null);
        const params = {
            nombre: "Carlos",
            apellido: "Tineo",
            username: "CarlosPrueba",
            password: "Carlos123#!",
        };
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/register")
            .send(params);
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        (0, vitest_1.expect)(insertMock).toHaveBeenCalled();
    }));
    // Should validate the input 
    (0, vitest_1.test)("SHOULD VALIDATE INPUT, THROW A VALIDATION ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = [{
                nombre: undefined,
                apellido: null,
                username: 442,
                password: { password: [1, 2, 3, 4, 5] },
            }];
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/register")
            .send(params);
        (0, vitest_1.expect)(response.statusCode).toBe(400);
        (0, vitest_1.expect)(response.body.errorType).toBe("Validation");
        (0, vitest_1.expect)(insertMock).toHaveBeenCalledTimes(0);
        (0, vitest_1.expect)(getUserMock).toHaveBeenCalledTimes(0);
    }));
    // // Should reject repeated users 
    (0, vitest_1.test)("SHOULD REJECT REPEATED USER, THROW A BAD REQUEST", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            id: 1,
            nombre: "CarlosTEST",
            apellido: "TineoTEST",
            username: "CarlosPruebaTEST",
            password: "Carlos123#!TEST",
            role: "Administrador",
            estado: "Activo"
        };
        getUserMock.mockResolvedValue(params);
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/register")
            .send({
            nombre: "Carlos",
            apellido: "Tineo",
            username: "CarlosPrueba",
            password: "Carlos123#!",
        });
        (0, vitest_1.expect)(response.statusCode).toBe(400);
        (0, vitest_1.expect)(response.body.errorType).toBe("Bad Request");
        (0, vitest_1.expect)(getUserMock).toHaveBeenCalledOnce();
        (0, vitest_1.expect)(insertMock).toHaveBeenCalledTimes(0);
    }));
});
