import { Controller, UseGuards, Request, Post, Res, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RefreshAuthGuard } from './refresh-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/signin')
  async signin(@Request() req: any, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.signin(req.user);
    const refreshToken = await this.authService.getRefreshToken(
      req.user.userId,
    );
    const secretData = {
      token,
      refreshToken,
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return this.authService.signin(req.user);

  }

  @Get('auth/refresh')
  @UseGuards(RefreshAuthGuard)
  async regenerateTokens(
    @Request() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signin(req.user);
    const refreshToken = await this.authService.getRefreshToken(
      req.user.userId,
    );
    const secretData = {
      token,
      refreshToken,
    };

    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return { msg: 'success' };
  }
}
