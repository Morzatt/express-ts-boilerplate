"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = exports.NotFoundError = exports.ValidationError = exports.BadRequestError = void 0;
class CustomError extends Error {
    constructor(message) {
        super(message);
    }
}
class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.type = "Bad Request";
        this.message = message || "Ha ocurrido un error al procesar la solicitud.";
    }
}
exports.BadRequestError = BadRequestError;
class ValidationError extends CustomError {
    constructor({ aditional }, message) {
        super(message);
        this.statusCode = 400;
        this.type = "Validation";
        this.message = "Ha ocurrido un error al validar los datos enviados.";
        this.aditional = aditional;
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.type = "Not Found";
        this.message = message || "Recurso no existente.";
    }
}
exports.NotFoundError = NotFoundError;
class ServiceUnavailableError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 503;
        this.type = "Service Unavailable";
        this.message = "Servicio no Disponible.";
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
exports.default = {
    ValidationError,
    BadRequestError,
    ServiceUnavailableError
};
