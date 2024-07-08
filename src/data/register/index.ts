import type {  NewUsuario, InsertPregSeg, PregSeg } from "../types";
import { db } from "../dbconn";

export const register  = {
    insertUser: async (usuario: NewUsuario): Promise<void> => {
        try {
            await db.insertInto("usuarios").values(usuario).executeTakeFirstOrThrow()
        } catch (err) {
            throw err
        }
    },

    insertSecurityQuestions: async (pregSeg: InsertPregSeg): Promise<void> => {
        try {
            await db.insertInto("preguntas").values(pregSeg).execute()
        } catch (err) {
            throw err
        }
    },

    getSecurityQuestions: async (usuario: number): Promise<PregSeg | null> => {
        try {
            const pregSeg = await db.selectFrom("preguntas").where("usuario", "=", usuario).selectAll().execute()
            if (pregSeg === undefined) {
                return null
            }
            return pregSeg[0]
        } catch (err) {
            throw err
        }
    },

    changePassword: async (newData: { usuario: number, password: string }): Promise<void> => {
        try {
            await db.updateTable("usuarios").set({ password: newData.password }).where("id", "=", newData.usuario).execute()
            return
        } catch (err) {
            throw err
        }
    }
}