import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password, body.name, body.role);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/')
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findAll(email);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
