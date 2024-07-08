// Types declaration for kysely queries

import {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'

export interface Database {
    usuarios: UsuariosTable,
    preguntas: PreguntasSeguridadTable
}

// Usuarios
export type UsuariosTable = {
    id: Generated<number>
    nombre: string
    apellido: string
    username: string
    password: string
    role: ColumnType<Roles, never>
    estado: ColumnType<Estados, never>
}
type Roles = "Administrador" | "Usuario"
type Estados = "Activo" | "Bloqueado"
export type Usuario = Selectable<UsuariosTable>
export type NewUsuario = Insertable<UsuariosTable>
export type UpdateUsuario = Updateable<UsuariosTable>

// Preguntas de Seguridad
export type PreguntasSeguridadTable = {
    usuario: number,
    preg_1: ColumnType<string, string, never>,
    res_1: ColumnType<string, string, never>,
    preg_2: ColumnType<string, string, never>,
    res_2: ColumnType<string, string, never>,
}
export type PregSeg = Selectable<PreguntasSeguridadTable>
export type InsertPregSeg = Insertable<PreguntasSeguridadTable>
export type UpdatePregSeg = Updateable<PreguntasSeguridadTable>