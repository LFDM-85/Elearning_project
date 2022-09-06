import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  Delete,
  Patch
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @UseGuards(AuthenticatedGuard)
  @Get('/whoami')
  async whoami(@ Request() req): Promise<string> {
    return req.user;
  }

  @Get('/all')
  // @UseGuards(JwtAuthGuard)
  findAllUsers() {
    return this.usersService.findAll();
  }
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findUser(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
