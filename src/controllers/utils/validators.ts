import { Request } from "express"
import z, { ZodSchema } from "zod"
import { ValidationError } from "../../classes/errors.classes"
import { preguntasDeSeguridad } from "../register.controller"

// INPUT VALIDATION FUNCTION
export function validateBody(req: Request, schema: ZodSchema) {
    const validationResult = schema.safeParse(req.body)
    if (!validationResult.success) {
        throw new ValidationError(undefined, {
            title: "Validaciones",
            errors: validationResult.error.flatten().fieldErrors
        })
    }
}

// REGISTER
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?!.*\s).{8,32}$/
export const registerUserSchema = z.object({
    nombre: z.string().min(4).max(20).trim(),
    apellido: z.string().min(4).max(20).trim(),
    username: z.string().min(4).max(20).trim(),
    password: z.string().min(8).max(32).regex(passwordRegex)
})

export const registerSQSchema = z.object({
    usuario: z.union([z.string().min(4).max(20).trim(), z.number()]),
    preg_1: z.string().refine(value => preguntasDeSeguridad.includes(value), {
        message: "La Pregunta de Seguridad 1 no se encuentra entre las preguntas de seguridad validas"
    }),
    res_1: z.string().min(4).max(200).trim(),
    preg_2: z.string().refine(value => preguntasDeSeguridad.includes(value), {
        message: "La Pregunta de Seguridad 2 no se encuentra entre las preguntas de seguridad validas"
    }),
    res_2: z.string().min(4).max(200).trim(),
    newPassword: z.string().min(8).max(32).regex(passwordRegex)
})

// LOGIN
export const loginBodySchema = z.object({
    username: z.string().min(4).max(20).trim(),
    password: z.string().min(8).max(32).regex(passwordRegex)
})