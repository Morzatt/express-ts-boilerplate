"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarios = void 0;
const mysqlConnection_1 = require("../mysqlConnection");
function usuarios() {
    const getUsers = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM usuarios WHERE role = 'Editor'";
            const [usersFromDB] = yield mysqlConnection_1.pool.query(query);
            const usuarios = usersFromDB.map(user => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    username: user.username,
                    role: user.role,
                    estado: user.estado
                };
            });
            return usuarios;
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const getUser = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM usuarios WHERE id = ?";
            const [userFromDB] = yield mysqlConnection_1.pool.query(query, [id]);
            const user = userFromDB.map(user => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    username: user.username,
                    role: user.role,
                    estado: user.estado
                };
            });
            return user;
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const editUser = (id, nombre, apellido, username) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "UPDATE usuarios SET nombre = ?, apellido = ?, username = ? WHERE id = ?";
            const [result, fields] = yield mysqlConnection_1.pool.query(query, [
                nombre, apellido, username, id
            ]);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "DELETE FROM usuarios WHERE id = ?";
            const [result, fields] = yield mysqlConnection_1.pool.query(query, [id]);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const blockUser = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "UPDATE usuarios SET estado = 'Bloqueado' WHERE id = ?";
            const [result, fields] = yield mysqlConnection_1.pool.query(query, [id]);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const unlockUser = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "UPDATE usuarios SET estado = 'Activo' WHERE id = ?";
            const [result, fields] = yield mysqlConnection_1.pool.query(query, [id]);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    return {
        getUsers,
        getUser,
        deleteUser,
        blockUser,
        unlockUser,
        editUser
    };
}
exports.usuarios = usuarios;
