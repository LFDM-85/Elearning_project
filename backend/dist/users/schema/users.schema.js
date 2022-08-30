"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersSchema = void 0;
const mongoose = require("mongoose");
exports.UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Array, required: true },
    refreshToken: { type: String, required: false },
    refreshTokenExp: { type: String, required: false },
});
//# sourceMappingURL=users.schema.js.map