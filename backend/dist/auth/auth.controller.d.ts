import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private jwtService;
    private userService;
    constructor(authService: AuthService, jwtService: JwtService, userService: UsersService);
    signin(req: any, res: Response): Promise<{
        token: string;
        user: import("../users/entities/user.entity").Users;
    }>;
    logout(req: any): any;
}
