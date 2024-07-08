// Creates the server, imports the routes and any other needed import such as middleware or similar files
// and sets and config them all, then exports it to the main


// Dependencies Import 
import express, { NextFunction, Request, Response } from "express";
import cors from "cors"
import session from "express-session";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";

// Config File Import
import config from "./config"

// Routes Import
import { main, login, register, logout, backup } from "./routes";

// Middleware Import
import errorHandler from "./middleware/errorHandler.middleware"
import { NotFoundError } from "./classes/errors.classes";
import authenticate from "./middleware/authenticate.middleware"
import logger from "./logger";

const app = express();

app.use(pinoHttp({ logger }))
app.use(cookieParser(config.key))
app.use(cors({
    origin: true,
    credentials: true 
}));
app.use(express.json());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes"
}))
app.use(session({
    secret: config.key,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 60,
    }
}));
app.use(fileUpload())

app.use("/", main)
app.use("/register", register)
app.use("/login", login)
app.use("/logout", logout)
app.use("/backup", authenticate, backup)

app.all("*", async (_, __, next: NextFunction) => {
    next(new NotFoundError())
})

app.use(errorHandler)

export default app