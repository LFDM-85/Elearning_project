import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  // Delete,
  Query,
  UseGuards,
  Res,
  Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { CurrentUser } from './decorators/current-user.decorator';
// import { Users } from './entities/user.entity';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.usersService.create(
      body.email,
      body.password,
      body.name,
      body.role,
    );
  }

  // @Post('/signout')
  // async logout(@Res({ passthrough: true }) response: Response) {
  //   response.clearCookie('token');
  // }

   @UseGuards(AuthenticatedGuard)
  @Get('/whoami')
  async whoami(@ Request() req): Promise<string> {
    return req.user;
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findUser(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }
}
