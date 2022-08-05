import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '../utils/bcrypt';
import { Users } from '../users/entities/user.entity';

import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  private user: Users;
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => TokenService))
    private tokenService: TokenService,
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

  async signin(user: Users) {
    const payload = { email: user.email, role: user.role, name: user.name };
    const token = await this.jwtService.sign(payload);
    await this.tokenService.saveToken(token, user.email);

    console.log(token);

    return {
      token,
      payload,
    };
  }
}
