import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request} from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken()
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  private static extractJWT(req: Request): string | null {
    if(
      req.cookies && 'token' in req.cookies && req.cookies.token.length > 0
    ) {
      return req.cookies.token
    }
    return null
  }

  async validate(payload: any) {
    if (payload === null) throw new UnauthorizedException();
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  }
}
