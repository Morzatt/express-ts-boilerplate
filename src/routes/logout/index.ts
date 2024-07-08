// Routes and configuration for the logout route

import { Request, Response, Router } from "express"
import { logout as logoutFunc } from "../../controllers/logout.controller";
export const logout = Router();

logout.get("/", logoutFunc)