"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = (req, res) => {
    req.session.destroy(err => {
        res.redirect("/");
    });
    res.clearCookie("token");
    res.status(200).redirect("/");
};
exports.logout = logout;
