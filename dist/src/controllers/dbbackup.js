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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadBackup = exports.createBackup = void 0;
const config_1 = __importDefault(require("../config"));
const child_process_1 = require("child_process");
function createBackup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, child_process_1.exec)(`mysqldump -u ${config_1.default.dbuser} --password=${config_1.default.dbpwd} -P 3307 ${config_1.default.dbname} > ./generated/backup.sql`);
            res.status(200).send({
                message: "Archivo de respaldo creado correctamente."
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar crear la copia de seguridad",
                err: err
            });
        }
    });
}
exports.createBackup = createBackup;
function uploadBackup(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Archivo recibido
        let dbBackup;
        let uploadPath;
        // Verificacion de que el archivo no sea nulo o este vacio
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({
                message: "No se ha subido ningún archivo."
            });
        }
        dbBackup = (_a = req.files) === null || _a === void 0 ? void 0 : _a.backup_upload;
        uploadPath = __dirname;
        if (!dbBackup.name.endsWith(".sql")) {
            return res.status(400).send({
                message: "El archivo subido no es un archivo sql. Asegurese de elegir el archivo correcto."
            });
        }
        try {
            // Translado del archivo a otro lugar
            dbBackup.mv(`./backup/${dbBackup.name}`, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("archivo movido exitosamente");
                }
            });
            (0, child_process_1.exec)(`mysql -u ${config_1.default.dbuser} --password=${config_1.default.dbpwd} -P 3307 ${config_1.default.dbname} < ./backup/${dbBackup.name}`)
                .addListener("message", (msg) => {
                console.log(msg);
            });
            res.status(200).send({
                message: "Copia de seguridad restaurada correctamente",
                err: null
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar cargar la copia de seguridad",
                err: err
            });
        }
    });
}
exports.uploadBackup = uploadBackup;
