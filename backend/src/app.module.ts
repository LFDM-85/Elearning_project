import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { ThrottlerModule } from '@nestjs/throttler';

dotenv.config();

const URL = process.env.DATABASE_URL;

@Module({
  imports: [
    MongooseModule.forRoot(URL),
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
