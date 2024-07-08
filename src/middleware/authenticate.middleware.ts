// Middleware to authenticate user when accessing protected routes

import config from "../config";
import { BadRequestError, UnauthorizedError } from "../classes/errors.classes";

import jwt from "jsonwebtoken"

import type { NextFunction, Request, Response } from "express";

async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies["token"] as string;
        if (!token) { throw new UnauthorizedError() }
        const usuario = jwt.verify(token, config.key);
        if (!usuario) { throw new BadRequestError() }
        req.body.user = usuario;
        next();
    } catch (err) {
        next(err)
    }
}

export default authenticate