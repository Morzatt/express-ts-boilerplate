"use strict";
// Middleware for handling errors through out the application
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const errors_classes_1 = require("../classes/errors.classes");
function errorHandler(err, req, res, next) {
    logger_1.default.error(err, err.message);
    let response = {
        message: err.message,
    };
    if (err.type) {
        response["errorType"] = err.type;
    }
    const exp = err instanceof errors_classes_1.ValidationError || err instanceof errors_classes_1.InternalError;
    if (exp) {
        if (err.aditional) {
            const title = err.aditional.title;
            response[title] = err.aditional.errors;
        }
    }
    res.status(err.statusCode || 500).send(response);
}
exports.default = errorHandler;
