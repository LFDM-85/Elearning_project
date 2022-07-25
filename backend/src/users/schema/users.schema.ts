import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Array, required: true },
  refreshToken: { type: String, required: true },
  refreshTokenExp: { type: String, required: true },
});
