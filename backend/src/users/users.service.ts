import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './entities/user.entity';
import { encodePassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private usersModel: Model<Users>) {}

  // creates a user entity instance
  async create(email: string, password: string, name: string, role: string[]) {
    const users = await this.usersModel.find({ email });
    if (users.length) throw new BadRequestException('Email in use');

    password = encodePassword(password);
    console.log(password);

    const user = await this.usersModel.create({
      email,
      password,
      name,
      role,
    });
    return user.save(); // saves the entity in MongoDB
  }

  async findAll(email: string) {
    return await this.usersModel.find({ email }).exec();
  }

  async findOne(condition: any): Promise<Users> {
    if (!condition) {
      return null;
    }
    return await this.usersModel.findOne(condition).exec();
  }

  async findEmail(email: string) {
    return await this.usersModel.findOne({ email }).exec();
  }

  async whoami(email: string) {
    return await this.usersModel.find({ email });
  }
}
