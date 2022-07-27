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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Users } from './entities/user.entity';
import { Response } from 'express';

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
      body.refreshToken,
      body.refreshTokenExp,
    );
  }

  @Post('/signout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('auth-cookie');
    response.clearCookie('refresh-cookie');
  }

  @Get('/whoami')
  @UseGuards(JwtAuthGuard)
  whoami(@CurrentUser() user: Users) {
    console.log('Current User', user);
    return user;
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch('/:id')
  // @UseGuards(JwtAuthGuard)
  // updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
  //   return this.usersService.update(+id, body);
  // }
  //
  // @Delete('/:id')
  // @UseGuards(JwtAuthGuard)
  // removeUser(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
