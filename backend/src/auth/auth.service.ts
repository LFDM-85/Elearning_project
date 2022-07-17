import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from '../utils/bcrypt';
import { Users } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
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
  async signin(user: Users) {
    const payload = { email: user.email, name: user.name, role: user.role };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
