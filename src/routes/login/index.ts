// Routes and configuration for the login route 

import { NextFunction, Request, Response, Router } from "express"
import { login as loginFunc } from "../../controllers/login.controller";

export const login = Router();

login.post("/", loginFunc)
