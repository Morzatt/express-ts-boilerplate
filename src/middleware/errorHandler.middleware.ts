// Middleware for handling errors through out the application

import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import { Errors, InternalError, ValidationError } from "../classes/errors.classes"

function errorHandler(err: Errors, req: Request, res: Response, next: NextFunction) {
    logger.error(err, err.message)
    let response: any = {
        message: err.message,
    }

    if (err.type) {
        response["errorType"] = err.type
    }
    const exp = err instanceof ValidationError || err instanceof InternalError
    if (exp) {
        if (err.aditional) {
            const title = err.aditional.title
            response[title] = err.aditional.errors
        }
    }
    
    res.status(err.statusCode || 500).send(response)
}

export default errorHandler