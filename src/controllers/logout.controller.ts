// Server's side logic for the log out function of the app
import { Request, Response } from "express";
import jwt from "jsonwebtoken"

export const logout = (req:Request, res:Response) => {
    req.session.destroy(err => {
        res.redirect("/")
    })
    res.clearCookie("token")
    res.status(200).redirect("/")
}      