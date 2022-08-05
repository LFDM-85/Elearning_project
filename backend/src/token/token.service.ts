import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './token.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel('Token') private tokenModel: Model<Token>,
    private usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async saveToken(hash: string, useremail: string) {
    const dbToken = await this.tokenModel.findOne({ useremail: useremail });
    console.log(dbToken);
    if (dbToken) {
      await this.tokenModel.remove({ _id: dbToken.id });
      const newToken = await this.tokenModel.create({
        hash,
        useremail,
      });
      return newToken.save();
    } else {
      const newToken = await this.tokenModel.create({
        hash,
        useremail,
      });
      return newToken.save();
    }
  }

  async refreshToken(oldToken: string) {
    const dbToken = await this.tokenModel.findOne({ hash: oldToken });
    console.log(dbToken);

    if (dbToken) {
      const user = await this.usersService.findOne(dbToken.useremail);
      return this.authService.signin(user);
    } else {
      return new HttpException(
        {
          errorMessage: 'Invalid token!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
