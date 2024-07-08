"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(`Error => Failed to destroy the session during logout: ${err}`);
            return res.redirect("/");
        }
        console.log("Cerrada la sesion correctamente");
        res.redirect("/");
    });
};
exports.logout = logout;
