"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = void 0;
const mongoose = require("mongoose");
exports.TokenSchema = new mongoose.Schema({
    hash: { type: String, required: true },
    useremail: { type: String, required: true },
});
//# sourceMappingURL=token.schema.js.map