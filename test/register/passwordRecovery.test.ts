// Test Utilities
import { describe, test, expect, vi } from "vitest"
import { afterEach } from "vitest"
import request from "supertest"

// Test Units
import app from "../../src/server"
import { register } from "../../src/data/register"
import { hashPwd } from "../../src/controllers/register.controller"
import { login } from "../../src/data/login"
import { preguntasDeSeguridad } from "../../src/controllers/register.controller"

// Types
import type { InsertPregSeg, PregSeg, Usuario } from "../../src/data/types"

// Mocks setup
    // GetUser Mock
const getUserMock = login.getUsuario = vi.fn()
    // GetSecurityQuestions Mock
const getSecurityQuestionsMock = register.getSecurityQuestions = vi.fn()
    // InsertSecurityQuestions Mock
const insertSecurityQuestionsMock = register.insertSecurityQuestions = vi.fn()
insertSecurityQuestionsMock.mockResolvedValue()
    // ChangePassword Mock
const changePasswordMock = register.changePassword = vi.fn()
changePasswordMock.mockResolvedValue()

describe("GET SECURITY QUESTIONS", () => {
    afterEach(() => {
        vi.clearAllMocks()
    })
    const usuario: Usuario = {
        id: 1,
        nombre: "CarlosTEST",
        apellido: "TineoTEST",
        username: "CarlosPruebaTEST",
        password: "Carlos123#!TEST",
        role: "Administrador",
        estado: "Activo"
    }
    test("SHOULD GET THE AVAILABLE SECURITY QUESTIONS", async () => {
        const response = await request(app)
            .get("/register/sq")

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({ preguntas: preguntasDeSeguridad })
    })

    test("SHOULD GET THE USER'S SECURITY QUESTIONS", async () => {
        const usq: PregSeg = {
                usuario: 2,
                preg_1: "", 
                res_1: "",
                preg_2: "",
                res_2: "",
        }
        getUserMock.mockResolvedValue(usuario)
        getSecurityQuestionsMock.mockResolvedValue(usq)

        const response = await request(app)
            .get("/register/sq?username=carlos")
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject(usq)
    })

    test("SHOULD VALIDATE USER NOT FOUND, THROW A NOT FOUND ERROR", async () => {
        getUserMock.mockResolvedValue(null)
        const response = await request(app)
            .get("/register/sq?username=carlos")
        
        expect(response.statusCode).toBe(404)
        expect(response.body.errorType).toBe("Not Found")
    })

    test("SHOULD VALIDATE USER WITHOUT QUESTIONS, THROW A NOT FOUND ERROR", async () => {
        getUserMock.mockResolvedValue(usuario)
        getSecurityQuestionsMock.mockResolvedValue(null)
        const response = await request(app)
            .get("/register/sq?username=carlos")
        
        expect(response.statusCode).toBe(404)
        expect(response.body.errorType).toBe("Not Found")
    })
})

describe("REGISTER SECURITY QUESTIONS", () => {
    afterEach(() => { 
        vi.clearAllMocks()
    })

    test("REGISTER USER'S SECURITY QUESTIONS", async () => {
        const params: InsertPregSeg = {
            usuario: 2,
            preg_1: preguntasDeSeguridad[0],
            res_1: "Teresa",
            preg_2: preguntasDeSeguridad[1],
            res_2: "Chariot"
        }
        const response = await request(app)
            .post("/register/sq")
            .send(params)
        expect(response.statusCode).toBe(200)
        expect(insertSecurityQuestionsMock).toHaveBeenCalled()
    })

    test("SHOULD REJECT INVALID INPUT, THROW A VALIDATION ERROR", async () => {
        const params = {
            usuario: "Carlostineo",
            pregunta1: "DE QUE COLOR ES SU PERRO",
            respuesta1: [{number: 21,}, "", 1200, []],
            pregunta2: 400,
            respuesta2: "Chariot"
        }
        const response = await request(app)
            .post("/register/sq")
            .send(params)

        expect(response.statusCode).toBe(400)
        expect(response.body.errorType).toBe("Validation")
        expect(insertSecurityQuestionsMock).toHaveBeenCalledTimes(0)
    })
})

describe("CHANGE PASSWORD", () => {
    afterEach(() => {
        vi.clearAllMocks()
    })
    const usuario: Usuario = {
        id: 2,
        nombre: "CarlosTEST",
        apellido: "TineoTEST",
        username: "CarlosPruebaTEST",
        password: "Carlos123#!TEST",
        role: "Administrador",
        estado: "Activo"
    }
    const params= {
        usuario: 2,
        preg_1: preguntasDeSeguridad[0],
        res_1: hashPwd("Teresa"),
        preg_2: preguntasDeSeguridad[1],
        res_2: hashPwd("Chariot"),
        newPassword: "Carlos123#"
    }
    // CHANGE PASSWORD IF EVERYTHING IS CORRECT
    test("SHOULD CHANGE PASSWORD", async () => {
        getUserMock.mockResolvedValue(usuario)
        getSecurityQuestionsMock.mockResolvedValue(params)
        const response = await request(app)
            .post("/register/recover")
            .send({
                usuario: "Carlos",
                newPassword: "Carlos123$%",
                res_1: "Teresa",
                res_2: "Chariot"
            })
        expect(response.statusCode).toBe(200)
        expect(getUserMock).toHaveBeenCalled()
        expect(getSecurityQuestionsMock).toHaveBeenCalled()
        expect(changePasswordMock).toHaveBeenCalled()
    })
    // REJECT IF THE SQ1 IS INCORRECT
    test("SHOULD REJECT IF THE SQ1 IS INCORRECT", async () => {
        getUserMock.mockResolvedValue(usuario)
        getSecurityQuestionsMock.mockResolvedValue(params)
        const response = await request(app)
            .post("/register/recover")
            .send({
                usuario: "Carlos",
                newPassword: "Carlos123$%",
                res_1: "Rogelia",
                res_2: "Chariot"
            })

        expect(response.statusCode).toBe(401)
        expect(response.body.errorType).toBe("Unauthorized")
        expect(getUserMock).toHaveBeenCalled()
        expect(getSecurityQuestionsMock).toHaveBeenCalled()
        expect(changePasswordMock).toHaveBeenCalledTimes(0)
    })
    // REJECT IF THE SQ2 IS INCORRECT
    test("SHOULD REJECT IF THE SQ2 IS INCORRECT", async () => {
        getUserMock.mockResolvedValue(usuario)
        getSecurityQuestionsMock.mockResolvedValue(params)
        const response = await request(app)
            .post("/register/recover")
            .send({
                usuario: "Carlos",
                newPassword: "Carlos123$%",
                res_1: "Teresa",
                res_2: "Ernesto"
            })

        expect(response.statusCode).toBe(401)
        expect(response.body.errorType).toBe("Unauthorized")
        expect(getUserMock).toHaveBeenCalled()
        expect(getSecurityQuestionsMock).toHaveBeenCalled()
        expect(changePasswordMock).toHaveBeenCalledTimes(0)
    })
    // REJECT IF THE USER IS NOT FOUND
    test("SHOULD REJECT IF THE USER IS NOT FOUND", async () => {
        getUserMock.mockResolvedValue(null)
        getSecurityQuestionsMock.mockResolvedValue(params)
        const response = await request(app)
            .post("/register/recover")
            .send({
                usuario: "Carlos",
                newPassword: "Carlos123$%",
                res_1: "Teresa",
                res_2: "Ernesto"
            })

        expect(response.statusCode).toBe(404)
        expect(response.body.errorType).toBe("Not Found")
        expect(getUserMock).toHaveBeenCalled()
        expect(getSecurityQuestionsMock).toHaveBeenCalledTimes(0)
        expect(changePasswordMock).toHaveBeenCalledTimes(0)
    })
    // REJECT IF THE USER HAS NO SECURITY QUESTIONS AVAILABLE
    test("REJECT IF THE USER HAS NO SECURITY QUESTIONS AVAILABLE", async () => {
        getUserMock.mockResolvedValue(usuario)
        getSecurityQuestionsMock.mockResolvedValue(null)
        const response = await request(app)
            .post("/register/recover")
            .send({
                usuario: "Carlos",
                newPassword: "Carlos123$%",
                res_1: "Teresa",
                res_2: "Ernesto"
            })

        expect(response.statusCode).toBe(404)
        expect(response.body.errorType).toBe("Not Found")
        expect(getUserMock).toHaveBeenCalled()
        expect(getSecurityQuestionsMock).toHaveBeenCalled()
        expect(changePasswordMock).toHaveBeenCalledTimes(0)
    })
})