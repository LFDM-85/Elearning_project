import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  admin: Boolean,
  name: String,
  email: String,
  password: String,
});
