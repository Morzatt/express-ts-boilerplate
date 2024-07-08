// Routes and configuration for the backup route 

import { NextFunction, Request, Response, Router } from "express"
import fs from "fs"
import { createBackup, uploadBackup } from "../../controllers/dbbackup.controller";
import { InternalError } from "../../classes/errors.classes";

export const backup = Router();

backup.get("/create", createBackup)

backup.get("/download",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const date = new Date()
            const backupName = `backup_${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}`
            fs.renameSync("./generated/backup.sql", `./generated/${backupName}.sql`)
            res.download(`./generated/${backupName}.sql`, (err) => {
                if (err) {
                    throw new InternalError("Error al intentar enviar el archivo", {
                        title: "Error",
                        errors: err
                    })
                }
            });
        } catch (err) {
            next(err)
        }
    }
)

backup.post("/upload", uploadBackup)