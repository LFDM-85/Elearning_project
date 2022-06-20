import { Document } from 'mongoose';

export class Users extends Document {
  admin: boolean;
  name: string;
  email: string;
  password: string;
}
