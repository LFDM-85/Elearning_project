import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/entities/user.entity';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        role: string[];
    }>;
    signin(user: Users): Promise<{
        token: string;
        user: Users;
    }>;
}
