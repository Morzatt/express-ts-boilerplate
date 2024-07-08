// Test Utilities
import { describe, test, expect, vi } from "vitest"
import { afterEach } from "vitest"
import request from "supertest"

// Test Units
import app from "../../src/server"
import { login } from "../../src/data/login"

// Types
import { hashPwd } from "../../src/controllers/register.controller"

// Mocks setup
// GetUser Mock
const getUsuarioMock = login.getUsuario = vi.fn()
getUsuarioMock.mockResolvedValue({
    id: 2,
    nombre: "CarlosTEST",
    apellido: "TineoTEST",
    username: "CarlosPruebaTEST",
    password: hashPwd("Carlos123#"),
    role: "Administrador",
    estado: "Activo"
})

describe("LOGIN", () => {
    afterEach(() => {
        vi.clearAllMocks()
    })
    // SHOULD LOG THE USER IN
    // SHOULD RESPONDS WITH THE JWT COOKIE
    test("SHOULD LOG THE USER IN, AND RESPOND WITH JWT", async () => {
        const response = await request(app).post("/login").send({
            username: "Carlos",
            password: "Carlos123#"
        })
        expect(response.statusCode).toBe(200)
        expect(response.header["set-cookie"]).toBeDefined()
        const tokenCookie = response.header["set-cookie"][0]
        expect(tokenCookie).toContain("token=")
        expect(getUsuarioMock).toHaveBeenCalled()
    })
    // SHOULD REJECT REQUEST IF THE USER ITS NOT REGISTERED
    test("SHOULD REJECT REQUEST IF THE USER ITS NOT REGISTERED", async () => {
        getUsuarioMock.mockResolvedValue(null)
        const response = await request(app).post("/login").send({
            username: "Carlos",
            password: "Carlos123#"
        })
        expect(response.statusCode).toBe(404)
        expect(getUsuarioMock).toHaveBeenCalled()
    })
    // SHOULD NOT LOG THE USER IF ITS BLOCKED
    test("SHOULD NOT LOG THE USER IF ITS BLOCKED", async () => {
        getUsuarioMock.mockResolvedValue({
            id: 2,
            nombre: "CarlosTEST",
            apellido: "TineoTEST",
            username: "CarlosPruebaTEST",
            password: hashPwd("Carlos123#"),
            role: "Administrador",
            estado: "Bloqueado"
        })
        const response = await request(app).post("/login").send({
            username: "Carlos",
            password: "Carlos123#"
        })
        expect(response.statusCode).toBe(401)
        expect(response.body.errorType).toBe("Unauthorized")
        expect(getUsuarioMock).toHaveBeenCalled()
    })
    
    // SHOLD REJECT INVALID CREDENTIALS
    test("SHOLD REJECT INVALID CREDENTIALS", async () => {
        getUsuarioMock.mockResolvedValue({
            id: 2,
            nombre: "CarlosTEST",
            apellido: "TineoTEST",
            username: "CarlosPruebaTEST",
            password: hashPwd("Carlos123567#"),
            role: "Administrador",
            estado: "Bloqueado"
        })
        const response = await request(app).post("/login").send({
            username: "Carlos",
            password: "Carlos123#"
        })
        expect(response.statusCode).toBe(400)
        expect(response.body.errorType).toBe("Bad Request")
        expect(getUsuarioMock).toHaveBeenCalled()
    })
    // SHOULD REJECT INVALID INPUT
    test("SHOULD REJECT INVALID INPUT", async () => {
        const response = await request(app).post("/login").send({
            username: [2, 4, {}, [1, 2, 3]],
            password: [{ password: 12345 }]
        })
        expect(response.statusCode).toBe(400)
        expect(response.body.errorType).toBe("Validation")
        expect(getUsuarioMock).toHaveBeenCalledTimes(0)
    })
})

describe("LOGOUT", () => {
    afterEach(() => {
        vi.clearAllMocks()
    })

    test("SHOULD LOG THE USER OUT, DELETE THE TOKEN", async () => {

    })
}) 