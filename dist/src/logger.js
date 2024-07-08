"use strict";
// logger set up
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("./config"));
const logger = (0, pino_1.default)({
    level: config_1.default.logLevel || 'info',
    formatters: {
        level: (label) => {
            return { severity: label.toUpperCase() };
        },
        bindings: (bindings) => {
            return {
                pid: bindings.pid,
                host: bindings.host
            };
        }
    },
    timestamp: pino_1.default.stdTimeFunctions.isoTime,
    transport: {
        target: "pino-pretty"
    }
});
exports.default = logger;
