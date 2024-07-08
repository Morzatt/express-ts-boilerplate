"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginBodySchema = exports.registerSQSchema = exports.registerUserSchema = exports.validateBody = void 0;
const zod_1 = __importDefault(require("zod"));
const errors_classes_1 = require("../../classes/errors.classes");
const register_controller_1 = require("../register.controller");
// INPUT VALIDATION FUNCTION
function validateBody(req, schema) {
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
        throw new errors_classes_1.ValidationError(undefined, {
            title: "Validaciones",
            errors: validationResult.error.flatten().fieldErrors
        });
    }
}
exports.validateBody = validateBody;
// REGISTER
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*\s).{8,32}$/;
exports.registerUserSchema = zod_1.default.object({
    nombre: zod_1.default.string().min(4).max(20).trim(),
    apellido: zod_1.default.string().min(4).max(20).trim(),
    username: zod_1.default.string().min(4).max(20).trim(),
    password: zod_1.default.string().min(8).max(32).regex(passwordRegex)
});
exports.registerSQSchema = zod_1.default.object({
    usuario: zod_1.default.union([zod_1.default.string().min(4).max(20).trim(), zod_1.default.number()]),
    preg_1: zod_1.default.string().refine(value => register_controller_1.preguntasDeSeguridad.includes(value), {
        message: "La Pregunta de Seguridad 1 no se encuentra entre las preguntas de seguridad validas"
    }),
    res_1: zod_1.default.string().min(4).max(200).trim(),
    preg_2: zod_1.default.string().refine(value => register_controller_1.preguntasDeSeguridad.includes(value), {
        message: "La Pregunta de Seguridad 2 no se encuentra entre las preguntas de seguridad validas"
    }),
    res_2: zod_1.default.string().min(4).max(200).trim(),
    newPassword: zod_1.default.string().min(8).max(32).regex(passwordRegex)
});
// LOGIN
exports.loginBodySchema = zod_1.default.object({
    username: zod_1.default.string().min(4).max(20).trim(),
    password: zod_1.default.string().min(8).max(32).regex(passwordRegex)
});
