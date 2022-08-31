import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ExtractJwt } from "passport-jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }


  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
