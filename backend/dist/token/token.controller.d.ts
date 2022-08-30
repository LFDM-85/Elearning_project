import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';
export declare class TokenController {
    private tokenService;
    constructor(tokenService: TokenService);
    refreshToken(data: RefreshTokenDto): Promise<import("@nestjs/common").HttpException | {
        token: string;
        user: import("../users/entities/user.entity").Users;
    }>;
}
