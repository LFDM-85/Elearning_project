import {
  Controller,
  UseGuards,
  Request,
  Post,
  Res,
  BadRequestException,
  Body,
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

    const token = this.jwtService.sign(user);

     const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

   res.cookie('token', token, cookieOptions);

    return this.authService.signin(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/signToken')
  async signToken(@Request() req, @Body() data) {
    console.log(data);

    return this.authService.signToken(data.token);
  }

  @Post('auth/signout')
        logout(@Request() req): any {
          req.session.destroy();
          return { msg: 'The user session has ended' }
        }
    
}
