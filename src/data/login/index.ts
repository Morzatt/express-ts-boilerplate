import { Usuario } from "../types";
import { db } from "../dbconn";

export const login = {
    getUsuario: async (username: string): Promise<Usuario | null> => {
        try {
            const usuario = await db.selectFrom("usuarios").where("username", '=', username).selectAll().executeTakeFirst()
            if (usuario === undefined) {
                return null
            }
            return usuario
        } catch (err) {
            throw err
        }
    },
}