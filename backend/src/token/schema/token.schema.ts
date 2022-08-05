import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  useremail: { type: String, required: true },
});
