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
const register_1 = require("../../src/data/register");
const register_controller_1 = require("../../src/controllers/register.controller");
const login_1 = require("../../src/data/login");
const register_controller_2 = require("../../src/controllers/register.controller");
// Mocks setup
// GetUser Mock
const getUserMock = login_1.login.getUsuario = vitest_1.vi.fn();
// GetSecurityQuestions Mock
const getSecurityQuestionsMock = register_1.register.getSecurityQuestions = vitest_1.vi.fn();
// InsertSecurityQuestions Mock
const insertSecurityQuestionsMock = register_1.register.insertSecurityQuestions = vitest_1.vi.fn();
insertSecurityQuestionsMock.mockResolvedValue();
// ChangePassword Mock
const changePasswordMock = register_1.register.changePassword = vitest_1.vi.fn();
changePasswordMock.mockResolvedValue();
(0, vitest_1.describe)("GET SECURITY QUESTIONS", () => {
    (0, vitest_2.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    const usuario = {
        id: 1,
        nombre: "CarlosTEST",
        apellido: "TineoTEST",
        username: "CarlosPruebaTEST",
        password: "Carlos123#!TEST",
        role: "Administrador",
        estado: "Activo"
    };
    (0, vitest_1.test)("SHOULD GET THE AVAILABLE SECURITY QUESTIONS", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .get("/register/sq");
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        (0, vitest_1.expect)(response.body).toMatchObject({ preguntas: register_controller_2.preguntasDeSeguridad });
    }));
    (0, vitest_1.test)("SHOULD GET THE USER'S SECURITY QUESTIONS", () => __awaiter(void 0, void 0, void 0, function* () {
        const usq = {
            usuario: 2,
            preg_1: "",
            res_1: "",
            preg_2: "",
            res_2: "",
        };
        getUserMock.mockResolvedValue(usuario);
        getSecurityQuestionsMock.mockResolvedValue(usq);
        const response = yield (0, supertest_1.default)(server_1.default)
            .get("/register/sq?username=carlos");
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        (0, vitest_1.expect)(response.body).toMatchObject(usq);
    }));
    (0, vitest_1.test)("SHOULD VALIDATE USER NOT FOUND, THROW A NOT FOUND ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        getUserMock.mockResolvedValue(null);
        const response = yield (0, supertest_1.default)(server_1.default)
            .get("/register/sq?username=carlos");
        (0, vitest_1.expect)(response.statusCode).toBe(404);
        (0, vitest_1.expect)(response.body.errorType).toBe("Not Found");
    }));
    (0, vitest_1.test)("SHOULD VALIDATE USER WITHOUT QUESTIONS, THROW A NOT FOUND ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        getUserMock.mockResolvedValue(usuario);
        getSecurityQuestionsMock.mockResolvedValue(null);
        const response = yield (0, supertest_1.default)(server_1.default)
            .get("/register/sq?username=carlos");
        (0, vitest_1.expect)(response.statusCode).toBe(404);
        (0, vitest_1.expect)(response.body.errorType).toBe("Not Found");
    }));
});
(0, vitest_1.describe)("REGISTER SECURITY QUESTIONS", () => {
    (0, vitest_2.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.test)("REGISTER USER'S SECURITY QUESTIONS", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            usuario: 2,
            preg_1: register_controller_2.preguntasDeSeguridad[0],
            res_1: "Teresa",
            preg_2: register_controller_2.preguntasDeSeguridad[1],
            res_2: "Chariot"
        };
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/register/sq")
            .send(params);
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        (0, vitest_1.expect)(insertSecurityQuestionsMock).toHaveBeenCalled();
    }));
    (0, vitest_1.test)("SHOULD REJECT INVALID INPUT, THROW A VALIDATION ERROR", () => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            usuario: "Carlostineo",
            pregunta1: "DE QUE COLOR ES SU PERRO",
            respuesta1: [{ number: 21, }, "", 1200, []],
            pregunta2: 400,
            respuesta2: "Chariot"
        };
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/register/sq")
            .send(params);
        (0, vitest_1.expect)(response.statusCode).toBe(400);
        (0, vitest_1.expect)(response.body.errorType).toBe("Validation");
        (0, vitest_1.expect)(insertSecurityQuestionsMock).toHaveBeenCalledTimes(0);
    }));
});
(0, vitest_1.describe)("CHANGE PASSWORD", () => {
    (0, vitest_2.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    const usuario = {
        id: 2,
        nombre: "CarlosTEST",
        apellido: "TineoTEST",
        username: "CarlosPruebaTEST",
        password: "Carlos123#!TEST",
        role: "Administrador",
        estado: "Activo"
    };
    const params = {
        usuario: 2,
        preg_1: register_controller_2.preguntasDeSeguridad[0],
        res_1: (0, register_controller_1.hashPwd)("Teresa"),
        preg_2: register_controller_2.preguntasDeSeguridad[1],
        res_2: (0, register_controller_1.hashPwd)("Chariot"),
        newPassword: "Carlos123#"
    };
    // CHANGE PASSWORD IF EVERYTHING IS CORRECT
    (0, vitest_1.test)("SHOULD CHANGE PASSWORD", () => __awaiter(void 0, void 0, void 0, function* () {
        getUserMock.mockResolvedValue(usuario);
        getSecurityQuestionsMock.mockResolvedValue(params);
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/register/recover")
            .send({
            usuario: "Carlos",
            newPassword: "Carlos123$%",
            res_1: "Teresa",
            res_2: "Chariot"
        });
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        (0, vitest_1.expect)(getUserMock).toHaveBeenCalled();
        (0, vitest_1.expect)(getSecurityQuestionsMock).toHaveBeenCalled();
        (0, vitest_1.expect)(changePasswordMock).toHaveBeenCalled();
    }));
    // REJECT IF THE SQ1 IS INCORRECT
    (0, vitest_1.test)("SHOULD REJECT IF THE SQ1 IS INCORRECT", () => __awaiter(void 0, void 0, void 0, function* () {
        getUserMock.mockResolvedValue(usuario);
        getSecurityQuestionsMock.mockResolvedValue(params);
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/register/recover")
            .send({
            usuario: "Carlos",
            newPassword: "Carlos123$%",
            res_1: "Rogelia",
            res_2: "Chariot"
        });
        (0, vitest_1.expect)(response.statusCode).toBe(401);
        (0, vitest_1.expect)(response.body.errorType).toBe("Unauthorized");
        (0, vitest_1.expect)(getUserMock).toHaveBeenCalled();
        (0, vitest_1.expect)(getSecurityQuestionsMock).toHaveBeenCalled();
        (0, vitest_1.expect)(changePasswordMock).toHaveBeenCalledTimes(0);
    }));
    // REJECT IF THE SQ2 IS INCORRECT
    (0, vitest_1.test)("SHOULD REJECT IF THE SQ2 IS INCORRECT", () => __awaiter(void 0, void 0, void 0, function* () {
        getUserMock.mockResolvedValue(usuario);
        getSecurityQuestionsMock.mockResolvedValue(params);
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/register/recover")
            .send({
            usuario: "Carlos",
            newPassword: "Carlos123$%",
            res_1: "Teresa",
            res_2: "Ernesto"
        });
        (0, vitest_1.expect)(response.statusCode).toBe(401);
        (0, vitest_1.expect)(response.body.errorType).toBe("Unauthorized");
        (0, vitest_1.expect)(getUserMock).toHaveBeenCalled();
        (0, vitest_1.expect)(getSecurityQuestionsMock).toHaveBeenCalled();
        (0, vitest_1.expect)(changePasswordMock).toHaveBeenCalledTimes(0);
    }));
    // REJECT IF THE USER IS NOT FOUND
    (0, vitest_1.test)("SHOULD REJECT IF THE USER IS NOT FOUND", () => __awaiter(void 0, void 0, void 0, function* () {
        getUserMock.mockResolvedValue(null);
        getSecurityQuestionsMock.mockResolvedValue(params);
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/register/recover")
            .send({
            usuario: "Carlos",
            newPassword: "Carlos123$%",
            res_1: "Teresa",
            res_2: "Ernesto"
        });
        (0, vitest_1.expect)(response.statusCode).toBe(404);
        (0, vitest_1.expect)(response.body.errorType).toBe("Not Found");
        (0, vitest_1.expect)(getUserMock).toHaveBeenCalled();
        (0, vitest_1.expect)(getSecurityQuestionsMock).toHaveBeenCalledTimes(0);
        (0, vitest_1.expect)(changePasswordMock).toHaveBeenCalledTimes(0);
    }));
    // REJECT IF THE USER HAS NO SECURITY QUESTIONS AVAILABLE
    (0, vitest_1.test)("REJECT IF THE USER HAS NO SECURITY QUESTIONS AVAILABLE", () => __awaiter(void 0, void 0, void 0, function* () {
        getUserMock.mockResolvedValue(usuario);
        getSecurityQuestionsMock.mockResolvedValue(null);
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/register/recover")
            .send({
            usuario: "Carlos",
            newPassword: "Carlos123$%",
            res_1: "Teresa",
            res_2: "Ernesto"
        });
        (0, vitest_1.expect)(response.statusCode).toBe(404);
        (0, vitest_1.expect)(response.body.errorType).toBe("Not Found");
        (0, vitest_1.expect)(getUserMock).toHaveBeenCalled();
        (0, vitest_1.expect)(getSecurityQuestionsMock).toHaveBeenCalled();
        (0, vitest_1.expect)(changePasswordMock).toHaveBeenCalledTimes(0);
    }));
});
