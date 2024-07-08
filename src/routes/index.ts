// Creates the main route of the application, and imports all the routes to then exports it as an object to be
// received in the main server.ts file

import { Request, Response, Router } from "express"
import { register } from "./register";
import { login } from "./login";
import { logout } from "./logout";
import { backup } from "./backup";

const main = Router();

main.get("/", (req: Request, res: Response) => {
    res.send("<h1>Main Page!</h1>")
})

export {
    main,
    register,
    login,
    logout,
    backup, 
}