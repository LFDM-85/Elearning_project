import {
  Controller,
  UseGuards,
  Request,
  Post,
  Res,
  Get,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Response, Request as Req } from 'express';
// import { RefreshAuthGuard } from './refresh-auth.guard';
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

    const token = await this.jwtService.signAsync({ id: user.id });

    // res.cookie('auth-cookie', jwt, { httpOnly: true });

    const refreshToken = await this.jwtService.signAsync({ id: user.id });
    // const refreshToken = await this.authService.getRefreshToken(req.user);

    // res.cookie('refresh-cookie', refreshToken, { httpOnly: true });

    // req.user = { ...req.user, ...refreshToken.userDataToUpdate, token };
    req.user = {...req.user, refreshToken, token};
    console.log(req.user);
    return this.authService.signin(req.user);
  }

  @Get('auth/user')
  async user(@Request() req: Req) {
    try {
      const cookie = req.cookies['refresh-cookie'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) throw new UnauthorizedException();

      const user = await this.userService.findOne({ id: data['id'] });

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  // @Get('auth/refresh')
  // @UseGuards(RefreshAuthGuard)
  // async regenerateTokens(
  //   @Request() req: any,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const token = await this.authService.signin(req.user);
  //   const refreshToken = await this.authService.getRefreshToken(req.user);
  //   const secretData = {
  //     token,
  //     refreshToken,
  //   };
  //
  //   res.cookie('auth-cookie', secretData, { httpOnly: true });
  //   req.user = { ...req.user, ...refreshToken.userDataToUpdate };
  //   console.log(req.user);
  //   return { msg: 'success' };
  // }
}
