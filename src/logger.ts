// logger set up

import pino from "pino"
import config from "./config"

const logger = pino({
    level: config.logLevel || 'info',
    formatters: {
        level: (label) => {
            return { severity: label.toUpperCase() }
        },
        bindings: (bindings) => {
            return {
                pid: bindings.pid,
                host: bindings.host
            } 
        }
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    transport: {
        target: "pino-pretty"
    }
})

export default logger; 