import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '../utils/bcrypt';
import { Users } from '../users/entities/user.entity';
import * as randomToken from 'rand-token';
import * as moment from 'moment';

@Injectable()
export class AuthService {
  private user: Users;
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findEmail(email);
    if (user) {
      const comparePass = comparePasswords(password, user.password);
      if (comparePass) {
        const { _id, name, email, role } = user;
        console.log('Correct password');
        return { id: _id, name, email, role };
      } else {
        console.log('Password is wrong!');
      }
    }
    console.log('User Validation failed!');
    return null;
  }

  public async getRefreshToken(user: Users) {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(256),
      refreshTokenExp: moment().add(2, 'day').format('DD/MM/YYYY'),
    };
    console.log(user);
    return { user, userDataToUpdate };
  }

  async signin(user: Users) {
    return {
      user,
    };
  }
}
