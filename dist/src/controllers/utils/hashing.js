"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPwd = void 0;
b;
const hashPwd = (pwd) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pwd, salt);
    return hash;
};
exports.hashPwd = hashPwd;
