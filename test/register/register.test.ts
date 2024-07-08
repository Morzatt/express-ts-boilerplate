// Test Utilities
import { describe, test, expect, vi } from "vitest"
import { afterEach } from "vitest"
import request from "supertest"

// Test Units
import app from "../../src/server"
import { register } from "../../src/data/register/index"
import { login } from "../../src/data/login"

// Types
import type { NewUsuario, Usuario } from "../../src/data/types"

// Mocks setup
// GetUser Mock
const getUserMock = login.getUsuario = vi.fn()
// Insert User Mock
const insertMock = register.insertUser = vi.fn()
insertMock.mockImplementation((userdata): Promise<void> => {
    return new Promise((resolve, reject) => {
        return resolve()
    })
})

describe("CREATE USERS", () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    // Should register users if everything is correct
    test("SHOULD REGISTER USER, RETURN 200", async () => {
        getUserMock.mockResolvedValue(null)
        const params = {
            nombre: "Carlos",
            apellido: "Tineo",
            username: "CarlosPrueba",
            password: "Carlos123#!",
        }
        const response = await request(app)
            .post("/register")
            .send(params);
        expect(response.statusCode).toBe(200)
        expect(insertMock).toHaveBeenCalled()
    })

    // Should validate the input 
    test("SHOULD VALIDATE INPUT, THROW A VALIDATION ERROR", async () => {
        const params = [{
            nombre: undefined,
            apellido: null,
            username: 442,
            password: { password: [1, 2, 3, 4, 5] },

        }]
        const response = await request(app)
            .post("/register")
            .send(params)
        expect(response.statusCode).toBe(400)
        expect(response.body.errorType).toBe("Validation")
        expect(insertMock).toHaveBeenCalledTimes(0)
        expect(getUserMock).toHaveBeenCalledTimes(0)
    })

    // // Should reject repeated users 
    test("SHOULD REJECT REPEATED USER, THROW A BAD REQUEST", async () => {
        const params: Usuario = {
            id: 1,
            nombre: "CarlosTEST",
            apellido: "TineoTEST",
            username: "CarlosPruebaTEST",
            password: "Carlos123#!TEST",
            role: "Administrador",
            estado: "Activo"
        }
        getUserMock.mockResolvedValue(params)
        const response = await request(app)
            .post("/register")
            .send({
                nombre: "Carlos",
                apellido: "Tineo",
                username: "CarlosPrueba",
                password: "Carlos123#!",
            })
        expect(response.statusCode).toBe(400)
        expect(response.body.errorType).toBe("Bad Request")
        expect(getUserMock).toHaveBeenCalledOnce()
        expect(insertMock).toHaveBeenCalledTimes(0)
    })
})