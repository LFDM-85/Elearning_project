import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<Users>) {}

  async create(email: string, password: string, name: string) {
    const user = await this.userModel.create({ email, password, name });
    return user.save();
  }

  async findById(id: string) {
    if (!id) {
      return null;
    }
    return await this.userModel.findById(id).exec();
  }

  async find(email: string) {
    return await this.userModel.find({ email }).exec();
  }
  async update(id: string, attributes: Partial<Users>) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found!');

    Object.assign(user, attributes);
    return user.save();
  }

  async remove(id: string) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found!');
    return user.remove();
  }
}
