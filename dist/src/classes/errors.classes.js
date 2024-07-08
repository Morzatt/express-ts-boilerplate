"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = exports.InternalError = exports.NotFoundError = exports.UnauthorizedError = exports.ValidationError = exports.BadRequestError = void 0;
class CustomError extends Error {
    constructor(message) {
        super(message);
    }
}
// 400
class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.type = "Bad Request";
        this.message = message || "Ha ocurrido un error al procesar la solicitud.";
    }
}
exports.BadRequestError = BadRequestError;
// 400 VALIDATION
class ValidationError extends CustomError {
    constructor(message, aditional) {
        super(message);
        this.statusCode = 400;
        this.type = "Validation";
        this.message = "Ha ocurrido un error al validar los datos enviados.";
        this.aditional = aditional;
    }
}
exports.ValidationError = ValidationError;
// 401
class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.type = "Unauthorized";
        this.message = message || "Recurso restringido debido a que no posee las credenciales válidas.";
    }
}
exports.UnauthorizedError = UnauthorizedError;
// 404
class NotFoundError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.type = "Not Found";
        this.message = message || "Recurso no existente.";
    }
}
exports.NotFoundError = NotFoundError;
// 500
class InternalError extends CustomError {
    constructor(message, aditional) {
        super(message);
        this.statusCode = 500;
        this.type = "Internal";
        this.message = message || "Error Interno del Servidor.";
        this.aditional = aditional;
    }
}
exports.InternalError = InternalError;
// 503
class ServiceUnavailableError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 503;
        this.type = "Service Unavailable";
        this.message = message || "Servicio no Disponible.";
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
exports.default = {
    ValidationError,
    BadRequestError,
    ServiceUnavailableError,
    UnauthorizedError,
    InternalError
};
