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
const login_1 = require("../../src/data/login");
// Types
const register_controller_1 = require("../../src/controllers/register.controller");
// Mocks setup
// GetUser Mock
const getUsuarioMock = login_1.login.getUsuario = vitest_1.vi.fn();
getUsuarioMock.mockResolvedValue({
    id: 2,
    nombre: "CarlosTEST",
    apellido: "TineoTEST",
    username: "CarlosPruebaTEST",
    password: (0, register_controller_1.hashPwd)("Carlos123#"),
    role: "Administrador",
    estado: "Activo"
});
(0, vitest_1.describe)("LOGIN", () => {
    (0, vitest_2.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    // SHOULD LOG THE USER IN
    // SHOULD RESPONDS WITH THE JWT COOKIE
    (0, vitest_1.test)("SHOULD LOG THE USER IN, AND RESPOND WITH JWT", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post("/login").send({
            username: "Carlos",
            password: "Carlos123#"
        });
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        (0, vitest_1.expect)(response.header["set-cookie"]).toBeDefined();
        const tokenCookie = response.header["set-cookie"][0];
        (0, vitest_1.expect)(tokenCookie).toContain("token=");
        (0, vitest_1.expect)(getUsuarioMock).toHaveBeenCalled();
    }));
    // SHOULD REJECT REQUEST IF THE USER ITS NOT REGISTERED
    (0, vitest_1.test)("SHOULD REJECT REQUEST IF THE USER ITS NOT REGISTERED", () => __awaiter(void 0, void 0, void 0, function* () {
        getUsuarioMock.mockResolvedValue(null);
        const response = yield (0, supertest_1.default)(server_1.default).post("/login").send({
            username: "Carlos",
            password: "Carlos123#"
        });
        (0, vitest_1.expect)(response.statusCode).toBe(404);
        (0, vitest_1.expect)(getUsuarioMock).toHaveBeenCalled();
    }));
    // SHOULD NOT LOG THE USER IF ITS BLOCKED
    (0, vitest_1.test)("SHOULD NOT LOG THE USER IF ITS BLOCKED", () => __awaiter(void 0, void 0, void 0, function* () {
        getUsuarioMock.mockResolvedValue({
            id: 2,
            nombre: "CarlosTEST",
            apellido: "TineoTEST",
            username: "CarlosPruebaTEST",
            password: (0, register_controller_1.hashPwd)("Carlos123#"),
            role: "Administrador",
            estado: "Bloqueado"
        });
        const response = yield (0, supertest_1.default)(server_1.default).post("/login").send({
            username: "Carlos",
            password: "Carlos123#"
        });
        (0, vitest_1.expect)(response.statusCode).toBe(401);
        (0, vitest_1.expect)(response.body.errorType).toBe("Unauthorized");
        (0, vitest_1.expect)(getUsuarioMock).toHaveBeenCalled();
    }));
    // SHOLD REJECT INVALID CREDENTIALS
    (0, vitest_1.test)("SHOLD REJECT INVALID CREDENTIALS", () => __awaiter(void 0, void 0, void 0, function* () {
        getUsuarioMock.mockResolvedValue({
            id: 2,
            nombre: "CarlosTEST",
            apellido: "TineoTEST",
            username: "CarlosPruebaTEST",
            password: (0, register_controller_1.hashPwd)("Carlos123567#"),
            role: "Administrador",
            estado: "Bloqueado"
        });
        const response = yield (0, supertest_1.default)(server_1.default).post("/login").send({
            username: "Carlos",
            password: "Carlos123#"
        });
        (0, vitest_1.expect)(response.statusCode).toBe(400);
        (0, vitest_1.expect)(response.body.errorType).toBe("Bad Request");
        (0, vitest_1.expect)(getUsuarioMock).toHaveBeenCalled();
    }));
    // SHOULD REJECT INVALID INPUT
    (0, vitest_1.test)("SHOULD REJECT INVALID INPUT", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post("/login").send({
            username: [2, 4, {}, [1, 2, 3]],
            password: [{ password: 12345 }]
        });
        (0, vitest_1.expect)(response.statusCode).toBe(400);
        (0, vitest_1.expect)(response.body.errorType).toBe("Validation");
        (0, vitest_1.expect)(getUsuarioMock).toHaveBeenCalledTimes(0);
    }));
});
(0, vitest_1.describe)("LOGOUT", () => {
    (0, vitest_2.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.test)("SHOULD LOG THE USER OUT, DELETE THE TOKEN", () => __awaiter(void 0, void 0, void 0, function* () {
    }));
});
