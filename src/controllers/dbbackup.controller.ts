import type { NextFunction, Request, Response } from "express";
import config from "../config";
import { exec } from "child_process";
import { BadRequestError, InternalError } from "../classes/errors.classes";

export async function createBackup(req: Request, res: Response, next: NextFunction) {
    try {
        const result = exec(`mysqldump -u ${config.dbuser} --password=${config.dbpwd} -P 3307 ${config.dbname} > ./generated/backup.sql`)
        result.on("error", (err) => {
            throw new InternalError("Ha ocurrido un error al intentar crear el archivo de respaldo.", {
                title: "Error",
                errors: err
            })
        })
        res.status(200).send({ message: "Archivo de respaldo creado correctamente." })
    } catch (err) {
        next(err)
    }
}

export async function uploadBackup(req: Request, res: Response, next: NextFunction) {
    try {
        // Archivo recibido
        let dbBackup: any;
        let uploadPath: string;
        // Verificacion de que el archivo no sea nulo o este vacio
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new BadRequestError("No se ha subido ningún archivo.")
        }
        dbBackup = req.files?.backup_upload;
        uploadPath = __dirname;
        if (!dbBackup.name.endsWith(".sql")) {
            throw new BadRequestError("El archivo subido no es un archivo sql. Asegurese de elegir el archivo correcto.")
        }
        // Translado del archivo a otro lugar
        dbBackup.mv(`./backup/${dbBackup.name}`, (err: any) => {
            if (err) {
                throw new InternalError("Ha ocurrido un error al intentar mover el archivo.", {
                    title: "Error",
                    errors: err
                })
            }
        });
        const result = exec(`mysql -u ${config.dbuser} --password=${config.dbpwd} -P 3307 ${config.dbname} < ./backup/${dbBackup.name}`)
        result.on("error", (err) => {
            throw new InternalError("Ha ocurrido un error al intentar crear el archivo de respaldo.", {
                title: "Error",
                errors: err
            })
        })
        res.status(200).send({ message: "Copia de seguridad restaurada correctamente" })
    } catch (err) {
        next(err)
    }
}