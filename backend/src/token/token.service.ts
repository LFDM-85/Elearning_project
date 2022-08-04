import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(@InjectModel('Token') private tokenModel: Model<Token>) {}

  async saveToken(hash: string, useremail: string) {
    const dbToken = await this.tokenModel.findOne({ useremail: useremail });
    console.log(dbToken);
    if (dbToken) {
      await this.tokenModel.remove({ _id: dbToken.id });
      const token = await this.tokenModel.create({
        hash,
        useremail,
      });
      return token.save();
    } else {
      const token = await this.tokenModel.create({
        hash,
        useremail,
      });
      return token.save();
    }
  }
}
