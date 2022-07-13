import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

require('dotenv').config();

const URL = process.env.DATABASE_URL;

@Module({
  imports: [MongooseModule.forRoot(URL), UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
