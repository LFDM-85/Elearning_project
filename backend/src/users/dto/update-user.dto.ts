import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsOptional()
  email: string;
  @IsString()
  @IsOptional()
  password: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsArray()
  @IsOptional()
  role: string[];
  @IsString()
  @IsOptional()
  refreshToken: string;
  @IsString()
  @IsOptional()
  refreshTokenExp: string;
}
