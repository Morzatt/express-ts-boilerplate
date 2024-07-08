// Server's side logic for the register function of the app

// Imports
import { register as registerModel } from "../data/register"
import { login } from "../data/login";
import { registerSQSchema, registerUserSchema, validateBody } from "./utils/validators";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../classes/errors.classes";
import logger from "../logger";

// Libraries Import
import { compare } from "bcrypt";
import bcrypt from "bcrypt";

// type imports
import type { NextFunction, Request, Response } from "express";
import type { InsertPregSeg, NewUsuario } from "../data/types";

export const hashPwd = (pwd: string): string => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pwd, salt);
    return hash
}

export const preguntasDeSeguridad: string[] = [
    "Nombre de su Abuela Paterna",
    "Nombre de su Primera Mascota",
    "Titulo de su Libro Favorito",
    "Comida Favorita",
    "Pelicula Favorita",
    "Profesion de su Padre",
    "Profesion de su Madre",
    "Color Favorito"
]

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        validateBody(req, registerUserSchema) 
        const userData: NewUsuario = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            username: req.body.username,
            password: hashPwd(req.body.password),
        }

        const DBUser = await login.getUsuario(userData.username)
        if (DBUser !== null) {
            throw new BadRequestError("El usuario ya se encuentra registrado")
        }
        await registerModel.insertUser(userData)
        return res.status(200).send({ message: `Usuario ${userData.username} correctamente registrado.` })
    } catch (err) {
        next(err)
    }
}

// 
export async function sendSecurityQuestions(req: Request, res: Response, next: NextFunction) {
    try {
        const username = req.query.username as string
        if (username === undefined) {
            return res.status(200).send({ preguntas: preguntasDeSeguridad })
        } 

        const usuario = await login.getUsuario(username)
        if (usuario === null) {
            throw new NotFoundError("No se encuentra el usuario especificado.")
        }

        const userSecurityQuestions = await registerModel.getSecurityQuestions(usuario.id)
        if (userSecurityQuestions === null) {
            throw new NotFoundError("El usuario no tiene preguntas de seguridad registradas.")
        }

        return res.status(200).send(userSecurityQuestions)
    } catch (err) {
        next(err)
    }
}

// 
export async function registerSecurityQuestions(req: Request, res: Response, next: NextFunction) {
    try {
        validateBody(req, registerSQSchema.omit({ newPassword: true }))
        const preguntasDeSeguridad: InsertPregSeg = {
            usuario: req.body.usuario,
            preg_1: req.body.preg_1,
            res_1: hashPwd(req.body.res_1),
            preg_2: req.body.preg_2,
            res_2: hashPwd(req.body.res_2)
        }
        await registerModel.insertSecurityQuestions(preguntasDeSeguridad)
        res.status(200).send({ message: "Preguntas de Seguridad insertadas correctamente" })
    } catch (err) {
        next(err)
    }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
    try {
        validateBody(req, registerSQSchema.omit({
            preg_1: true,
            preg_2: true
        }))
        const newData = {
            usuario: req.body.usuario,
            password: hashPwd(req.body.newPassword),
            res_1: req.body.res_1,
            res_2: req.body.res_2
        }
        const usuario = await login.getUsuario(newData.usuario)
        if (usuario === null) {
            throw new NotFoundError("No se encuentra el usuario especificado.")
        }
        const securityQuestions = await registerModel.getSecurityQuestions(usuario.id)
        if (securityQuestions === null) {
            throw new NotFoundError("El usuario no tiene preguntas de seguridad registradas.")
        }
        const result1 = await compare(newData.res_1, securityQuestions.res_1)
        if (!result1) {
            throw new UnauthorizedError("La Pregunta de Seguridad #1 no coincide.")
        }
        const result2 = await compare(newData.res_2, securityQuestions.res_2)
        if (!result2) {
            throw new UnauthorizedError("La Pregunta de Seguridad #2 no coincide.")
        }
        await registerModel.changePassword(newData)
        return res.status(200).send({ message: `Contraseña correctamente cambiada.` })
    } catch (err) {
        next(err)
    }
}