import {
  Controller,
  UseGuards,
  Request,
  Post,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Response} from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/signin')
  async signin(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    const user = req.user;

    if (!user) throw new BadRequestException('invalid credentials');

    return this.authService.signin(req.user);
  }

  @Post('auth/signout')
        logout(@Request() req): any {
          req.session.destroy();
          return { msg: 'The user session has ended' }
        }
    
}
