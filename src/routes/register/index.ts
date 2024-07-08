// Routes and configuration for the register route

import { NextFunction, Request, Response, Router } from "express"
import * as registerController from "../../controllers/register.controller"

export const register = Router();

register.post("/", registerController.register)

register.get("/sq", registerController.sendSecurityQuestions)

register.post("/sq", registerController.registerSecurityQuestions)

register.post("/recover", registerController.changePassword)