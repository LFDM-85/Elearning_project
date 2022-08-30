import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    private authService;
    constructor(authService: AuthService);
}
export {};
