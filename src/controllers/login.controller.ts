// Imports 
import { BadRequestError, NotFoundError, UnauthorizedError } from "../classes/errors.classes";
import { login as loginModel} from "../data/login";
import { loginBodySchema, validateBody } from "./utils/validators";

// Libraries Imports
import { compare } from "bcrypt";
import jwt from "jsonwebtoken"

// Types Imports
import type { NextFunction, Request, Response } from "express";
import config from "../config";

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        validateBody(req, loginBodySchema)
        const { username, password } = req.body;

        const usuario = await loginModel.getUsuario(username);
        if (usuario === null) {
            throw new NotFoundError("El usuario no se encuentra registrado.")
        }

        const auth = await compare(password, usuario.password)
        if (!auth) { throw new BadRequestError("Contraseña incorrecta.") }

        if (usuario.estado === "Bloqueado") {
            throw new UnauthorizedError("El usuario no puede iniciar sesión porque su acceso ha sido bloqueado.")
        }

        Reflect.deleteProperty(usuario, "password")
        const token = jwt.sign(usuario, config.key, { expiresIn: "1d" });
        res.cookie("token", token, { httpOnly: true, secure: false })

        return res.status(200).send({ message: "Inicio de Sesión Exitoso" })
    } catch (err) {
        next(err)
    }
}