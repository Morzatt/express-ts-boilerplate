type Aditional = {
    title: string,
    errors: any
}

type ErrorTypes = "Validation" | "Bad Request" | "Not Found" | "Service Unavailable" | "Unauthorized" | "Internal"

abstract class CustomError extends Error {
    constructor(message?: string) {
        super(message)
    }
    abstract statusCode: number;
    abstract type: ErrorTypes;
}

// 400
export class BadRequestError extends CustomError {
    statusCode: number = 400;
    type: ErrorTypes = "Bad Request"

    constructor(message?: string) {
        super(message)
        this.message = message || "Ha ocurrido un error al procesar la solicitud."
    }
}

// 400 VALIDATION
export class ValidationError extends CustomError {
    statusCode: number = 400
    aditional: Aditional | undefined;
    type: ErrorTypes = "Validation"

    constructor(message?: string, aditional?: Aditional) {
        super(message)
        this.message = "Ha ocurrido un error al validar los datos enviados."
        this.aditional = aditional
    }
}

// 401
export class UnauthorizedError extends CustomError {
    statusCode: number = 401
    type: ErrorTypes = "Unauthorized"

    constructor(message?: string) {
        super(message)
        this.message = message || "Recurso restringido debido a que no posee las credenciales válidas."
    }
}

// 404
export class NotFoundError extends CustomError {
    statusCode: number = 404;
    type: ErrorTypes = "Not Found"

    constructor(message?: string) {
        super(message)
        this.message = message || "Recurso no existente."
    }
}
// 500
export class InternalError extends CustomError {
    statusCode: number = 500;
    type: ErrorTypes = "Internal"
    aditional: Aditional | undefined;

    constructor(message?: string, aditional?: Aditional) {
        super(message)
        this.message = message || "Error Interno del Servidor."
        this.aditional = aditional
    }
}
// 503
export class ServiceUnavailableError extends CustomError {
    statusCode: number = 503;
    type: ErrorTypes = "Service Unavailable"

    constructor(message?: string) {
        super(message)
        this.message = message || "Servicio no Disponible."
    }
}

export type Errors = ValidationError | BadRequestError | NotFoundError | ServiceUnavailableError | UnauthorizedError | InternalError;

export default {
    ValidationError,
    BadRequestError,
    ServiceUnavailableError,
    UnauthorizedError,
    InternalError
}