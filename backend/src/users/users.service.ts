import { Injectable } from '@nestjs/common';
import { Users } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<Users>) {}

  async create(email: string, password: string, name: string, admin: boolean) {
    const user = this.userModel.create({ email, password, name, admin });
    return (await user).save();
  }
}
