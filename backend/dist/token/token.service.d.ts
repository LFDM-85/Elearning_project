import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
export declare class TokenService {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
}
