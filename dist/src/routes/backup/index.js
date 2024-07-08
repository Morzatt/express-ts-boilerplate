"use strict";
// Routes and configuration for the backup route 
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
exports.backup = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const dbbackup_controller_1 = require("../../controllers/dbbackup.controller");
const errors_classes_1 = require("../../classes/errors.classes");
exports.backup = (0, express_1.Router)();
exports.backup.get("/create", dbbackup_controller_1.createBackup);
exports.backup.get("/download", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        const backupName = `backup_${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}`;
        fs_1.default.renameSync("./generated/backup.sql", `./generated/${backupName}.sql`);
        res.download(`./generated/${backupName}.sql`, (err) => {
            if (err) {
                throw new errors_classes_1.InternalError("Error al intentar enviar el archivo", {
                    title: "Error",
                    errors: err
                });
            }
        });
    }
    catch (err) {
        next(err);
    }
}));
exports.backup.post("/upload", dbbackup_controller_1.uploadBackup);
