import { Body, Controller, Put, UseGuards } from "@nestjs/common";
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';
import { JwtStrategy } from "../auth/jwt.strategy";

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @UseGuards(JwtStrategy)
  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
