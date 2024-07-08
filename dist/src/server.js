"use strict";
// Creates the server, imports the routes and any other needed import such as middleware or similar files
// and sets and config them all, then exports it to the main
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
// Dependencies Import 
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const pino_http_1 = __importDefault(require("pino-http"));
// Config File Import
const config_1 = __importDefault(require("./config"));
// Routes Import
const routes_1 = require("./routes");
// Middleware Import
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
const errors_classes_1 = require("./classes/errors.classes");
const authenticate_middleware_1 = __importDefault(require("./middleware/authenticate.middleware"));
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
app.use((0, pino_http_1.default)({ logger: logger_1.default }));
app.use((0, cookie_parser_1.default)(config_1.default.key));
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes"
}));
app.use((0, express_session_1.default)({
    secret: config_1.default.key,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 60,
    }
}));
app.use((0, express_fileupload_1.default)());
app.use("/", routes_1.main);
app.use("/register", routes_1.register);
app.use("/login", routes_1.login);
app.use("/logout", routes_1.logout);
app.use("/backup", authenticate_middleware_1.default, routes_1.backup);
app.all("*", (_, __, next) => __awaiter(void 0, void 0, void 0, function* () {
    next(new errors_classes_1.NotFoundError());
}));
app.use(errorHandler_middleware_1.default);
exports.default = app;
